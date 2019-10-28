import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      height: Yup.number().required(),
      weight: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const errors = await schema.validate(req.body).catch(err => err.errors);
      return res.status(400).json({ errors });
    }

    const { email, name, height, weight } = req.body;

    await Student.create({
      email,
      name,
      height,
      weight,
    });

    return res.status(201).json({
      student: {
        email,
        name,
        height,
        weight,
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      height: Yup.number(),
      weight: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      const errors = await schema.validate(req.body).catch(err => err.errors);
      return res.status(400).json({ errors });
    }

    const student = await Student.findByPk(req.params.id);

    const { name, height, weight } = req.body;

    const { email, id } = await student.update({
      name,
      height,
      weight,
    });

    return res.json({
      id,
      email,
      name,
      height,
      weight,
    });
  }
}

export default new StudentController();
