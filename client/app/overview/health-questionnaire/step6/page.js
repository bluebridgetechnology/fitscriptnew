"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep6() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step6', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step6 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    callFetch('diagnostic-journey/health-questionnaire/step6', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step7');
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
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '75%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 6 of 8</p>
              <h5>LIFESTYLE SUMMARY</h5>
              <p>Fill out these details carefully</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">What are the challenges that prevent you from improving your diet and health?</label>
                      <textarea className="form-control" rows={5} {...register("challenges_to_improve")} placeholder="Write here..."></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3 pb-md-1">
                      <label className="form-label d-block mb-3">Tobacco:</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="I have never smoked" id="tobacco1" {...register("tobacco")} />
                        <label className="form-check-label" htmlFor="tobacco1">I have never smoked</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="I use other tabacco products." id="tobacco2" {...register("tobacco")} />
                        <label className="form-check-label" htmlFor="tobacco2">I use other tabacco products.</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">I currently smoke ___________ pack/day.</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("smoke_pack_per_day")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Alcohol:</label>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" value="I have never smoked" id="alcohol1" {...register("alcohol")} />
                        <label className="form-check-label" htmlFor="alcohol1">I have never drink alcohol.</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" value="I occasionally drink alcohol." id="alcohol2" {...register("alcohol")} />
                        <label className="form-check-label" htmlFor="alcohol2">I occasionally drink alcohol.</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" value="I have a family history of alcoholism." id="alcohol3" {...register("alcohol")} />
                        <label className="form-check-label" htmlFor="alcohol3">I have a family history of alcoholism.</label>
                      </div>
                    </div>
                    <div className="mb-3 pb-md-1">
                      <label className="form-label d-block mb-3">Do you use drugs?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="drugs1" {...register("drugs")} />
                        <label className="form-check-label" htmlFor="drugs1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="drugs2" {...register("drugs")} />
                        <label className="form-check-label" htmlFor="drugs2">No</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How many meals per week are consumed from fast food<br />restaurants?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("fast_food_per_week")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How many sodas (diet or regular) do you consume per<br />week?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("sodas_per_week")} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">I quit smoking in: (mo/yr)</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("quit_smoking")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">I have smoked for __________ years.</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("smoked_for_years")} />
                    </div>
                    <div className="mb-3 mb-md-5">
                      <label className="form-label">I drink _______ drinks per day ( week / month)</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("drinks_per_day")} />
                    </div>
                    <div className="mb-3 pb-md-1 pt-2">
                      <label className="form-label d-block mb-3">Do you have concerns about chemical use?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="chemical1" {...register("chemical_use_concerns")} />
                        <label className="form-check-label" htmlFor="chemical1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="chemical2" {...register("chemical_use_concerns")} />
                        <label className="form-check-label" htmlFor="chemical2">No</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How many meals per week are consumed from regular (not fast food) restaurants?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("regular_restaurant_per_week")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: '0.99rem' }}>How many servings of refined sugar do you have per week? (desserts, candy, chocolate, sodas, etc.)One serving equals about 100 calories.</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("refined_sugar_per_week")} />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <label className="form-label">Please describe the following to the best of your ability (what did you eat the last three days):</label>
                    <div className="table-responsive mb-3">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="invisible"></th>
                            <th>LAST 3 DAYS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Typical Breakfast:</th>
                            <td><input type="text" className="form-control" {...register("last_three_days[Typical Breakfast]")} /></td>
                          </tr>
                          <tr>
                            <th>Typical Lunch:</th>
                            <td><input type="text" className="form-control" {...register("last_three_days[Typical Lunch]")} /></td>
                          </tr>
                          <tr>
                            <th>Typical Dinner:</th>
                            <td><input type="text" className="form-control" {...register("last_three_days[Typical Dinner]")} /></td>
                          </tr>
                          <tr>
                            <th>Common Snack Foods:</th>
                            <td><input type="text" className="form-control" {...register("last_three_days[Common Snack Foods]")} /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-3">
                      <label className="form-label">Please list any dietary restrictions/preferences you have:</label>
                      <textarea className="form-control" rows={5} {...register("dietary_restrictions")} placeholder="Write here..."></textarea>
                    </div>
                    <div className="mt-3">
                      <label className="form-label">How many hours and times per week do you exercise? Please describe your current exercise routine, if you have one: (If you do not exercise, please indicate what problems limit your activities)</label>
                      <textarea className="form-control" rows={5} {...register("exercise_per_week")} placeholder="Write here..."></textarea>
                    </div>
                    <p className="mt-3">On weekdays I go to bed at <input type="time" className="mx-3 border-0 border-bottom" {...register("weekday_go_bed_at")} placeholder="Time" /> and I am likely to be asleep by <input type="time" className="ms-3 border-0 border-bottom" {...register("weekday_asleep_by")} placeholder="Time" /></p>
                    <p className="mt-3">On weekdays my alarm goes off at <input type="time" className="mx-3 border-0 border-bottom" {...register("weekday_alarm_at")} placeholder="Time" /> and I get out of bed at <input type="time" className="ms-3 border-0 border-bottom" {...register("weekday_get_of_bed_at")} placeholder="Time" /></p>
                    <p className="mt-3">On weekdays I wake up <input type="text" className="mx-3 border-0 border-bottom" {...register("weekday_wake_up")} placeholder="Type here" /> times per night.</p>
                    <p className="mt-3">On weekends I go to bed at <input type="time" className="mx-3 border-0 border-bottom" {...register("weekends_go_bed_at")} placeholder="Time" /> and I am likely to be asleep by <input type="time" className="ms-3 border-0 border-bottom" {...register("weekends_asleep_by")} placeholder="Time" /></p>
                    <p className="mt-3">On weekends my alarm goes off at <input type="time" className="mx-3 border-0 border-bottom" {...register("weekends_alarm_at")} placeholder="Time" /> and I get out of bed at <input type="time" className="ms-3 border-0 border-bottom" {...register("weekends_get_of_bed_at")} placeholder="Time" /></p>
                    <p className="mt-3">On weekends I wake up <input type="text" className="mx-3 border-0 border-bottom" {...register("weekends_wake_up")} placeholder="Type here" /> times per night.</p>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <h5>SOCIAL HEALTH</h5>
                    <p>Because stress has a direct effect on your overall health and wellbeing that often leads to illness, immunesystem dysfunction, and emotional disorders, it is important that your health care provider is aware of anystressful influences that may be impacting your health. Informing your doctor allows him/her to offeryou supportive treatment options and optimize the outcome of your health care.</p>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview/health-questionnaire/step5" className="btn btn-outline-secondary me-3">Go Back</Link>
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