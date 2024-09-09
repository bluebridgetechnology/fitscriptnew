"use client"
import CircleRating from '@/components/overview/circle-rating';
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep1() {
  const router = useRouter();
  const [step1, setStep1] = useState({});
  const [howImportant, setHowImportant] = useState(0);
  const [howMotivated, setHowMotivated] = useState(0);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step1', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        setStep1(res.data);
        setHowImportant(res.data?.health_questionnaire?.step1?.how_important_to_resolve);
        setHowMotivated(res.data?.health_questionnaire?.step1?.motivated_to_change_lifestyle);
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step1 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    formData.how_important_to_resolve = howImportant;
    formData.motivated_to_change_lifestyle = howMotivated;
    callFetch('diagnostic-journey/health-questionnaire/step1', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step2');
    });
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card rounded-4 border-0">
            <div className="card-body">
              <h6><Image src="/diagnostic-journey-icon.png" className="me-1" width="18" height="18" alt="" /> Your Diagnostic Journey</h6>
              <hr />
              <div className="row pt-3 fit-steps">
                <div className="col-md-2 offset-md-1" style={{ backgroundPositionX: '75px' }}>
                  <p className="text-center"><Image src="/circle-numbers/1-fill.png" width="40" height="40" alt="" /><br />Register Test</p>
                </div>
                <div className="col-md-2">
                  <p className="text-center"><Image src="/circle-numbers/2-fill.png" width="40" height="40" alt="" /><br />Health Questionnaire</p>
                </div>
                <div className="col-md-2">
                  <p className="text-center"><Image src="/circle-numbers/3.png" width="40" height="40" alt="" /><br />Blood Draw</p>
                </div>
                <div className="col-md-2">
                  <p className="text-center"><Image src="/circle-numbers/4.png" width="40" height="40" alt="" /><br />Review Video</p>
                </div>
                <div className="col-md-2" style={{ backgroundPositionX: '-116px' }}>
                  <p className="text-center"><Image src="/circle-numbers/5.png" width="40" height="40" alt="" /><br />FitScript</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card rounded-4 border-0 my-4">
            <div className="card-body">
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={12.5} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '12.5%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 1 of 8</p>
              <h5>New Patient Questionnaire</h5>
              <p>Fill out these details carefully</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">First Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter your first name" value={step1.first_name ?? ''} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">DOB<span className="text-danger">*</span></label>
                      <input type="date" className="form-control" placeholder="YYYY-DD-MM" value={step1.birth_date ?? ''} readOnly />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Last Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter your last name" value={step1.last_name ?? ''} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date<span className="text-danger">*</span></label>
                      <input type="date" className="form-control" placeholder="YYYY-DD-MM" {...register("just_date", { required: true })} required />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">What specific concerns do you have about your health:</label>
                      <textarea className="form-control" rows={5} {...register("specific_health_concern")} placeholder="Write here..."></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How long have you suffered with this/these problem(s)?</label>
                      <textarea className="form-control" rows={5} {...register("how_long_suffered")} placeholder="Write here..."></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">What have you tried in the past to resolve the above that did not work:</label>
                      <textarea className="form-control" rows={5} {...register("tried_in_the_past")} placeholder="Write here..."></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How important is it for you to resolve your health concerns on scale of 1-10 (1 being the lowest)?</label>
                      <CircleRating value={howImportant} totalCircle={10} onChange={(v) => setHowImportant(v)} firstLabel="Lowest" lastLabel="Highest" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How prepared/motivated are you to make the appropriate lifestyle changes that may be necessary in order to achieve your goals (1 being the lowest)?</label>
                      <CircleRating value={howMotivated} totalCircle={10} onChange={(v) => setHowMotivated(v)} firstLabel="Worst" lastLabel="Best" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Have you experienced any of the following recently? Please circle the number that best describes your experiences with 1 being extremely mild and 5 being extremely severe.</label>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="invisible"></th>
                              <th>1</th>
                              <th>2</th>
                              <th>3</th>
                              <th>4</th>
                              <th>5</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sleep Disturbance</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sleep Disturbance]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sleep Disturbance]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sleep Disturbance]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sleep Disturbance]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sleep Disturbance]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Fatigue</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fatigue]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fatigue]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fatigue]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fatigue]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fatigue]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Weight Gain</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Weight Gain]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Weight Gain]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Weight Gain]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Weight Gain]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Weight Gain]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Breast Tenderness</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Breast Tenderness]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Breast Tenderness]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Breast Tenderness]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Breast Tenderness]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Breast Tenderness]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Decreased libido</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Decreased libido]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Decreased libido]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Decreased libido]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Decreased libido]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Decreased libido]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Fluid Retention</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fluid Retention]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fluid Retention]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fluid Retention]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fluid Retention]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Fluid Retention]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Sugar Cravings</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sugar Cravings]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sugar Cravings]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sugar Cravings]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sugar Cravings]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Sugar Cravings]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Hot Flashes</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Hot Flashes]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Hot Flashes]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Hot Flashes]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Hot Flashes]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Hot Flashes]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Night Sweats</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Night Sweats]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Night Sweats]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Night Sweats]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Night Sweats]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Night Sweats]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Irritability</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Irritability]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Irritability]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Irritability]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Irritability]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Irritability]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Memory Loss</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Memory Loss]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Memory Loss]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Memory Loss]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Memory Loss]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Memory Loss]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Vaginal Dryness</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Vaginal Dryness]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Vaginal Dryness]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Vaginal Dryness]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Vaginal Dryness]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Vaginal Dryness]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Dry Skin</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Dry Skin]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Dry Skin]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Dry Skin]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Dry Skin]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Dry Skin]")} value="5" /></td>
                            </tr>
                            <tr>
                              <td>Depression</td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Depression]")} value="1" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Depression]")} value="2" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Depression]")} value="3" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Depression]")} value="4" /></td>
                              <td><input className="form-check-input" type="radio" {...register("recently_experienced[Depression]")} value="5" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <p className="mt-3">If yes, what do you believe it to be? <input type="text" className="ms-3 border-0 border-bottom" {...register("if_yes_your_belief")} placeholder="Type a label" /></p>
                    <p className="mt-3">On weekdays my alarm goes off at <input type="time" className="mx-3 border-0 border-bottom" {...register("weekday_alarm_at")} placeholder="Time" /> and I get out of bed at <input type="time" className="ms-3 border-0 border-bottom" {...register("weekday_get_of_bed_at")} placeholder="Time" /></p>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview" className="btn btn-outline-secondary me-3">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Continue</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}