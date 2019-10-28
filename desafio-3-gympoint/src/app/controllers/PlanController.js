import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    console.log(req.body);

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const errors = await schema.validate(req.body).catch(err => err.errors);
      return res.status(400).json({ errors });
    }

    const { title, duration, price } = req.body;

    const plan = await Plan.create({
      title,
      duration,
      price,
    });

    return res.status(201).json({ plan });
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.destroy({
      where: { id },
    });

    return res.json({ plan });
  }
}

export default new PlanController();
