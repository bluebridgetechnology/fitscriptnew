"use client"
import CircleRating from '@/components/overview/circle-rating';
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep8() {
  const [area1, setArea1] = useState();
  const [area2, setArea2] = useState();
  const [area3, setArea3] = useState();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step8', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        setArea1(res.data?.health_questionnaire?.step8?.pain_severity?.area1?.pain);
        setArea2(res.data?.health_questionnaire?.step8?.pain_severity?.area2?.pain);
        setArea3(res.data?.health_questionnaire?.step8?.pain_severity?.area3?.pain);
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step8 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    formData.pain_severity['area1']['pain'] = area1;
    formData.pain_severity['area2']['pain'] = area2;
    formData.pain_severity['area3']['pain'] = area3;
    callFetch('diagnostic-journey/health-questionnaire/step8', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/blood-drawn');
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
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '100%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 8 of 8</p>
              <h5>PAIN ASSESSMENT</h5>
              <p>Fill out these details carefully</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Are you currently in pain?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="pain1" {...register("pain")} />
                        <label className="form-check-label" htmlFor="pain1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="pain2" {...register("pain")} />
                        <label className="form-check-label" htmlFor="pain2">No</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label d-block mb-3">Is the source of your pain due to an injury?</label>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Yes" id="injury1" {...register("injury")} />
                        <label className="form-check-label" htmlFor="injury1">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="No" id="injury2" {...register("injury")} />
                        <label className="form-check-label" htmlFor="injury2">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">If yes, please describe your injury and the date in which occurred,If no, please describe how long you have experienced this pain and what you believe it isattributed to:</label>
                      <textarea className="form-control" rows={5} {...register("injury_description")} placeholder="Write here..."></textarea>
                    </div>
                    <p className="mb-3">Please use the area(s) and illustration below to describe the severity of your pain.</p>
                    <p className="mb-3">(0 = no pain, 10 = severe pain)</p>
                    <p className="mb-3">Area 1: <input type="text" className="mx-3 border-0 border-bottom" {...register("pain_severity[area1][label]")} placeholder="Type here" /></p>
                    <CircleRating value={area1} totalCircle={10} onChange={(v) => setArea1(v)} firstLabel="No pain" lastLabel="Severe pain" />
                    <p className="my-3">Area 2: <input type="text" className="mx-3 border-0 border-bottom" {...register("pain_severity[area2][label]")} placeholder="Type here" /></p>
                    <CircleRating value={area2} totalCircle={10} onChange={(v) => setArea2(v)} firstLabel="No pain" lastLabel="Severe pain" />
                    <p className="my-3">Area 3: <input type="text" className="mx-3 border-0 border-bottom" {...register("pain_severity[area3][label]")} placeholder="Type here" /></p>
                    <CircleRating value={area3} totalCircle={10} onChange={(v) => setArea3(v)} firstLabel="No pain" lastLabel="Severe pain" />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview/health-questionnaire/step7" className="btn btn-outline-secondary me-3">Go Back</Link>
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