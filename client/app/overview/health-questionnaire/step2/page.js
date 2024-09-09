"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep2() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step2', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step2 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    callFetch('diagnostic-journey/health-questionnaire/step2', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step3');
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
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '25%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 2 of 8</p>
              <h5>PERSONAL MEDICAL HISTORY</h5>
              <p>Fill out these details carefully</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label"></label>
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
                              <td>Headaches(Migraines)</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Headaches(Migraines)]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Headaches(Migraines)]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Seizure Disorder</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Seizure Disorder]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Seizure Disorder]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Recurrent Sinus Infections</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Recurrent Sinus Infections]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Recurrent Sinus Infections]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Emotional/Psychiatric Illness</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Emotional/Psychiatric Illness]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Emotional/Psychiatric Illness]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Depression</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Depression]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Depression]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Anxiety/Excessive Stress</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Anxiety/Excessive Stress]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Anxiety/Excessive Stress]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Asthma</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Asthma]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Asthma]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Chronic Bronchitis</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chronic Bronchitis]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chronic Bronchitis]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Chronic Indigestion</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chronic Indigestion]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chronic Indigestion]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Stomach Ulcers</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Stomach Ulcers]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Stomach Ulcers]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Intestinal Disease</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Intestinal Disease]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Intestinal Disease]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Skin Problems</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Skin Problems]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Skin Problems]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Back Pain/Sciatica/Disc Problems</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Back Pain/Sciatica/Disc Problems]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Back Pain/Sciatica/Disc Problems]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Chronic Muscle/Joint Pain</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chronic Muscle/Joint Pain]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chronic Muscle/Joint Pain]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Carpal Tunnel Syndrome</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Carpal Tunnel Syndrome]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Carpal Tunnel Syndrome]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Fibromyalgia</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Fibromyalgia]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Fibromyalgia]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Diabetes</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Diabetes]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Diabetes]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Thyroid Disease</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Thyroid Disease]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Thyroid Disease]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Osteoporosis/Osteopenia</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Osteoporosis/Osteopenia]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Osteoporosis/Osteopenia]")} value="No" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label"></label>
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
                              <td>Heart Disease</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Heart Disease]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Heart Disease]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Chest Pain</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chest Pain]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Chest Pain]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Irregular Heartbeat</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Irregular Heartbeat]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Irregular Heartbeat]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Blood Clotting Problems/Bleeding Disorder</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Blood Clotting Problems/Bleeding Disorder]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Blood Clotting Problems/Bleeding Disorder]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Stroke/Vascular Disease</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Stroke/Vascular Disease]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Stroke/Vascular Disease]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Constipation/Diarrhea</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Constipation/Diarrhea]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Constipation/Diarrhea]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Hepatitis/Liver Disease</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Hepatitis/Liver Disease]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Hepatitis/Liver Disease]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Kidney Disease</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Kidney Disease]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Kidney Disease]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Menstrual Disorders</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Menstrual Disorders]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Menstrual Disorders]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Reproduction Problems</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Reproduction Problems]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Reproduction Problems]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Sexual/Libido Problems</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Sexual/Libido Problems]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Sexual/Libido Problems]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Tendonitis</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Tendonitis]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Tendonitis]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Osteoarthritis</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Osteoarthritis]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Osteoarthritis]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Rheumatoid Arthritis</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Rheumatoid Arthritis]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Rheumatoid Arthritis]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Artificial Joint(s)</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Artificial Joint(s)]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Artificial Joint(s)]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Cancer</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Cancer]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Cancer]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>Psoriasis or Eczema</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Psoriasis or Eczema]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[Psoriasis or Eczema]")} value="No" /></td>
                            </tr>
                            <tr>
                              <td>HIV/AIDS</td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[HIV/AIDS]", { required: true })} value="Yes" required /></td>
                              <td><input className="form-check-input" type="radio" {...register("personal_medical_history[HIV/AIDS]")} value="No" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">List any additional health problems not listed above:</label>
                      <textarea className="form-control" rows={5} {...register("additional_health_problem")} placeholder="Write here..."></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">List any surgeries/operations you have had and when:</label>
                      <textarea className="form-control" rows={5} {...register("list_any_surgery")} placeholder="Write here..."></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview/health-questionnaire/step1" className="btn btn-outline-secondary me-3">Go Back</Link>
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