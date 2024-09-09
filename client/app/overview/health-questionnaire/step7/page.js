"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep7() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step7', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step7 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    callFetch('diagnostic-journey/health-questionnaire/step7', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step8');
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
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={87.5} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '87.5%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 7 of 8</p>
              <h5>STRESS / PSYCHOSOCIAL HISTORY</h5>
              <p>Fill out these details carefully</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Are you overall happy?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="happy1" {...register("overall_happy")} />
                        <label className="form-check-label" htmlFor="happy1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="happy2" {...register("overall_happy")} />
                        <label className="form-check-label" htmlFor="happy2">No</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">If no, do you believe that stress is presently reducing the quality of your life?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="stress_effect1" {...register("stress_effect")} />
                        <label className="form-check-label" htmlFor="stress_effect1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="stress_effect2" {...register("stress_effect")} />
                        <label className="form-check-label" htmlFor="stress_effect2">No</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Do you feel you can easily handle the stress in your life?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="stress1" {...register("handle_stress")} />
                        <label className="form-check-label" htmlFor="stress1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="stress2" {...register("handle_stress")} />
                        <label className="form-check-label" htmlFor="stress2">No</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">If yes, do you believe that you know the source of your<br />stress?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="stress_source1" {...register("stress_source")} />
                        <label className="form-check-label" htmlFor="stress_source1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="stress_source2" {...register("stress_source")} />
                        <label className="form-check-label" htmlFor="stress_source2">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <p className="mb-3">If yes, what do you believe it to be? <input type="text" className="mx-3 border-0 border-bottom" {...register("stress_reason")} placeholder="Type here" /></p>
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Have you contemplated suicide?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="suicide1" {...register("contemplated_suicide")} />
                        <label className="form-check-label" htmlFor="suicide1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="suicide2" {...register("contemplated_suicide")} />
                        <label className="form-check-label" htmlFor="suicide2">No</label>
                      </div>
                    </div>
                    <p className="mb-3">If yes, how often? <input type="text" className="mx-3 border-0 border-bottom" {...register("suicide_attempt")} placeholder="Type here" /> When was the last time? <input type="text" className="mx-3 border-0 border-bottom" {...register("last_suicide_attempt")} placeholder="Type here" /></p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Have you ever sought help through counseling?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="counseling1" {...register("counseling")} />
                        <label className="form-check-label" htmlFor="counseling1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="counseling2" {...register("counseling")} />
                        <label className="form-check-label" htmlFor="counseling2">No</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Was it helpful?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="counseling_helpful1" {...register("counseling_helpful")} />
                        <label className="form-check-label" htmlFor="counseling_helpful1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="counseling_helpful2" {...register("counseling_helpful")} />
                        <label className="form-check-label" htmlFor="counseling_helpful2">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <p className="mb-3">If yes, what type? (e.g., pastor, psychologist, etc..) <input type="text" className="mx-3 border-0 border-bottom" {...register("counseling_type")} placeholder="Type here" /></p>
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Do you practice meditation or relaxation techniques?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="meditation1" {...register("meditation")} />
                        <label className="form-check-label" htmlFor="meditation1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="meditation2" {...register("meditation")} />
                        <label className="form-check-label" htmlFor="meditation2">No</label>
                      </div>
                    </div>
                    <p className="mb-3">If yes, how often? <input type="text" className="mx-3 border-0 border-bottom" {...register("meditation_how_often")} placeholder="Type here" /></p>
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Check all that apply:</label>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Yoga" id="Yoga" {...register("all_that_apply[]")} />
                        <label className="form-check-label" htmlFor="Yoga">Yoga</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Meditation" id="meditation3" {...register("all_that_apply[]")} />
                        <label className="form-check-label" htmlFor="meditation3">Meditation</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Imagery" id="Imagery" {...register("all_that_apply[]")} />
                        <label className="form-check-label" htmlFor="Imagery">Imagery</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Breathing" id="Breathing" {...register("all_that_apply[]")} />
                        <label className="form-check-label" htmlFor="Breathing">Breathing</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Tai Chi" id="taichi" {...register("all_that_apply[]")} />
                        <label className="form-check-label" htmlFor="taichi">Tai Chi</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Prayer" id="Prayer" {...register("all_that_apply[]")} />
                        <label className="form-check-label" htmlFor="Prayer">Prayer</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Other" id="Other" {...register("all_that_apply[]")} />
                        <label className="form-check-label" htmlFor="Other">Other</label>
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Hobbies and leisure activities:</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("hobbies")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How well have things been going for you?</label>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="invisible"></th>
                              <th>Very Well</th>
                              <th>Fine</th>
                              <th>Poorly</th>
                              <th>Very Poorly</th>
                              <th>Does Not Apply</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>At school</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[At school]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[At school]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[At school]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[At school]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[At school]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>In your job</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your job]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your job]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your job]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your job]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your job]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>In your social life</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your social life]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your social life]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your social life]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your social life]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[In your social life]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>With close friends</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With close friends]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With close friends]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With close friends]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With close friends]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With close friends]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>With sex</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With sex]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With sex]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With sex]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With sex]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With sex]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>With your attitude</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your attitude]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your attitude]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your attitude]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your attitude]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your attitude]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>With your boyfriend/ girlfriend</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your boyfriend/ girlfriend]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your boyfriend/ girlfriend]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your boyfriend/ girlfriend]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your boyfriend/ girlfriend]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your boyfriend/ girlfriend]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>With your children</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your children]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your children]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your children]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your children]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your children]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>With your parents</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your parents]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your parents]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your parents]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your parents]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your parents]")} value="Does Not Apply" /></td>
                            </tr>
                            <tr>
                              <th>With your spouse</th>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your spouse]")} value="Very Well" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your spouse]")} value="Fine" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your spouse]")} value="Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your spouse]")} value="Very Poorly" /></td>
                              <td><input className="form-check-input" type="radio" {...register("things_been_going[With your spouse]")} value="Does Not Apply" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Which of the following provided you emotional support?</label>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Spouse" id="esSpouse" {...register("emotional_support[]")} />
                        <label className="form-check-label" htmlFor="esSpouse">Spouse</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Family" id="esFamily" {...register("emotional_support[]")} />
                        <label className="form-check-label" htmlFor="esFamily">Family</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Friend" id="esFriend" {...register("emotional_support[]")} />
                        <label className="form-check-label" htmlFor="esFriend">Friend</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Religious/Spiritual" id="esReligious" {...register("emotional_support[]")} />
                        <label className="form-check-label" htmlFor="esReligious">Religious/Spiritual</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Pets" id="esPets" {...register("emotional_support[]")} />
                        <label className="form-check-label" htmlFor="esPets">Pets</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Other" id="esOther" {...register("emotional_support[]")} />
                        <label className="form-check-label" htmlFor="esOther">Other</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="invisible"></th>
                              <th>Yes</th>
                              <th>No</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Have you ever been involved in abusive relationships in your life?</td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Have you ever been involved in abusive relationships in your life?]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Have you ever been involved in abusive relationships in your life?]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Have you ever been abused, a victim of a crime, or experienced a significant trauma?</td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Have you ever been abused a victim of a crime or experienced a significant trauma?]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Have you ever been abused a victim of a crime or experienced a significant trauma?]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Did you feel safe growing up?</td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Did you feel safe growing up?]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Did you feel safe growing up?]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Was alcoholism or substance abuse present in your childhood home?</td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Was alcoholism or substance abuse present in your childhood home?]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Was alcoholism or substance abuse present in your childhood home?]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Is alcoholism or substance abuse present in your relationship now?</td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Is alcoholism or substance abuse present in your relationship now?]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("some_questions[Is alcoholism or substance abuse present in your relationship now?]")} value="No" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview/health-questionnaire/step6" className="btn btn-outline-secondary me-3">Go Back</Link>
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