"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function HQStep5() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/health-questionnaire/step5', "GET", []).then((res) => {
      if (!res.ok) return;
      if (res.data) {
        for (let [key, value] of Object.entries(res.data?.health_questionnaire?.step5 ?? {}))
          setValue(key, value);
      }
    });
  }, []);

  const onSubmit = (formData) => {
    callFetch('diagnostic-journey/health-questionnaire/step5', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step6');
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
              <div className="progress" role="progressbar" aria-label="label" aria-valuenow={62.5} aria-valuemin={0} aria-valuemax={100} style={{ height: '0.5rem' }}>
                <div className="progress-bar bg-default overflow-visible" style={{ width: '62.5%' }}></div>
              </div>
              <p className="text-dark fw-bold small">Step 5 of 8</p>
              <h5>MEDICATIONS / SUPPLEMENTATIONS</h5>
              <p>List current medications (or those you have taken within the last year). PLEASE DO NOT FORGET TO LISTTHE EXACT BIO-IDENTICAL HORMONES YOU ARE CURRENTLY TAKING (if applicable).</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="invisible" style={{ width: '15%' }}></th>
                            <th>Medication Name</th>
                            <th>Started Date</th>
                            <th>Stopped Date</th>
                            <th>Satisfied</th>
                            <th style={{ fontSize: '0.9rem' }}>Dosage (amt/# daily)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[0][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[0][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[0][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[0][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[0][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[1][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[1][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[1][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[1][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[1][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[2][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[2][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[2][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[2][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[2][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[3][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[3][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[3][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[3][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[3][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[4][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[4][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[4][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[4][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[4][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[5][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[5][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[5][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[5][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[5][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[6][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[6][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[6][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[6][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[6][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[7][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[7][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[7][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[7][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[7][dosage]")} /></td>
                          </tr>
                          <tr>
                            <th>Medication Name</th>
                            <td><input type="text" className="form-control" {...register("medications[8][name]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[8][started_date]")} /></td>
                            <td><input type="date" className="form-control" {...register("medications[8][stopped_date]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[8][satisfied]")} /></td>
                            <td><input type="text" className="form-control" {...register("medications[8][dosage]")} /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3">
                      <label className="form-label">Nutritional supplements, vitamins, herbs, homeopathic remedies taken:</label>
                      <textarea className="form-control" rows={5} {...register("remedies_taken")} placeholder="Write here..."></textarea>
                    </div>
                    <div className="mt-3">
                      <label className="form-label">Medication Allergies:</label>
                      <textarea className="form-control" rows={5} {...register("medication_allergies")} placeholder="Write here..."></textarea>
                    </div>
                    <div className="mt-3">
                      <label className="form-label">Environmental / Food Allergies:</label>
                      <textarea className="form-control" rows={5} {...register("food_allergies")} placeholder="Write here..."></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12 text-end">
                    <Link href="/overview/health-questionnaire/step4" className="btn btn-outline-secondary me-3">Go Back</Link>
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