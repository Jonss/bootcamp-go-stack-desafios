import { addMonths, parseISO } from 'date-fns';
import * as Yup from 'yup';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const errors = await schema.validate(req.body).catch(err => err.errors);
      return res.status(400).json(errors);
    }

    const { plan_id, student_id, start_date } = req.body;

    if (await Enrollment.findOne({ where: { student_id } })) {
      return res.status(400).json({ error: 'user already in a plan' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: `Plan ${plan_id} not found` });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const plan_title = plan.title;
    const price = plan.duration * plan.price;

    const { id } = await Enrollment.create({
      start_date,
      end_date,
      plan_id,
      student_id,
      price,
    });

    // TODO send email

    return res.json({
      id,
      end_date,
      start_date,
      plan: {
        title: plan.title,
        duration: plan.duration,
        price: plan.price,
      },
      price,
      student_id,
      plan_title,
    });
  }
}

export default new EnrollmentController();
