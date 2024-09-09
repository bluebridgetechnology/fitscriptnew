"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep3() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step3', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step3 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    callFetch('diagnostic-journey/health-questionnaire/step3', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step4');
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
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={37.5} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '37.5%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 3 of 8</p>
              <h5>FAMILY HISTORY</h5>
              <p>For the conditions listed below, check Yes or No if anyone in you family has been affected, then pleasenote your relationship to the relative with that condition/disease on the adjacent line.</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label"></label>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="invisible"></th>
                              <th>Yes</th>
                              <th>No</th>
                              <th>Relationship</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Autoimmune conditions(s)</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Autoimmune conditions(s)][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Autoimmune conditions(s)][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Autoimmune conditions(s)][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Breast Cancer</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Breast Cancer][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Breast Cancer][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Breast Cancer][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Diabetes</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Diabetes][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Diabetes][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Diabetes][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Colon Cancer</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Colon Cancer][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Colon Cancer][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Colon Cancer][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Heart Disease</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Heart Disease][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Heart Disease][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Heart Disease][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Hypertension</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Hypertension][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Hypertension][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Hypertension][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Ovarian/Uterine Cancer</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Ovarian/Uterine Cancer][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Ovarian/Uterine Cancer][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Ovarian/Uterine Cancer][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Skin Disorder</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Skin Disorder][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Skin Disorder][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Skin Disorder][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Asthma</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Asthma][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Asthma][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Asthma][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Thyroid Disease (Hypo/Hyper/Hashimotos)</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Thyroid Disease (Hypo/Hyper/Hashimotos)][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Thyroid Disease (Hypo/Hyper/Hashimotos)][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Thyroid Disease (Hypo/Hyper/Hashimotos)][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Stroke</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Stroke][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Stroke][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Stroke][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Mental Illness</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Mental Illness][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Mental Illness][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Mental Illness][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>High Cholesterol</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[High Cholesterol][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[High Cholesterol][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[High Cholesterol][relationship]")} /></td>
                            </tr>
                            <tr>
                              <td>Other (Please List)</td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Other (Please List)][affected]")} value="Yes" /></td>
                              <td><input className="form-check-input" type="radio" {...register("family_history[Other (Please List)][affected]")} value="No" /></td>
                              <td><input type="text" className="form-control" {...register("family_history[Other (Please List)][relationship]")} /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview/health-questionnaire/step2" className="btn btn-outline-secondary me-3">Go Back</Link>
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