"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep4() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step4', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step4 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    callFetch('diagnostic-journey/health-questionnaire/step4', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step5');
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
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '50%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 4 of 8</p>
              <h5>FEMALE PERSONAL HISTORY</h5>
              <p>Fill out these details carefully</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Are you still menstruating?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("still_menstruating")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Are you sexually active?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("sexually_active")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Are your cycles regular?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("menstrual_cycle_regular")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Form of birth control?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("form_of_birth_control")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Have you ever been pregnant?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("ever_been_pregnant")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Number of: Full Term Live Births:</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("number_of_full_term_live_births")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Have you had a hysterectomy?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("had_hysterectomy")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Do you still have your ovaries?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("still_have_your_ovaries")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Endometriosis? Result.</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("endometriosis")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date of last Mammogram (if applicable):</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("last_mammogram_date")} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">First day of last menstrual cycle?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("first_day_of_last_menstrual")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Do you have bleeding between periods?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("bleeding_between_periods")} />
                    </div>
                    <div className="mb-3 pb-md-1">
                      <label className="form-label d-block mb-3">Flow (Pick one)</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Light" id="flow1" {...register("menstrual_flow")} />
                        <label className="form-check-label" htmlFor="flow1">Light</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Normal" id="flow2" {...register("menstrual_flow")} />
                        <label className="form-check-label" htmlFor="flow2">Normal</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Heavy" id="flow3" {...register("menstrual_flow")} />
                        <label className="form-check-label" htmlFor="flow3">Heavy</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Are you pregnant?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("pregnant")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">How many pregnancies?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("how_many_pregnancies")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Miscarriages:</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("miscarriage")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tubal ligation?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("tubal_ligation")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Do you have uterine fibroids?</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("have_uterine_fibroids")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Clinic / Doctor Name:</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("clinic_or_doctor_name")} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mammogram performed at:</label>
                      <input type="text" className="form-control" placeholder="Type here" {...register("mammogram_performed_at")} />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview/health-questionnaire/step3" className="btn btn-outline-secondary me-3">Go Back</Link>
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