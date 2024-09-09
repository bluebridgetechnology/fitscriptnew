"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function RegisterTest() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch('diagnostic-journey/register-test', "GET", []).then((res) => {
      if (!res.ok) return;
      for (let [key, value] of Object.entries(res.data)) {
        setValue(key, value);
      }
      setMobile(res.data.mobile);
    });
  }, []);

  function handleMobileInput(newValue) {
    setValue('mobile', newValue, { shouldDirty: true });
    setMobile(newValue);
    clearErrors('mobile');
  }

  const onSubmit = (formData) => {
    formData.mobile = mobile;
    callFetch('diagnostic-journey/register-test', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/overview/health-questionnaire/step1');
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
                  <p className="text-center"><Image src="/circle-numbers/2.png" width="40" height="40" alt="" /><br />Health Questionnaire</p>
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
              <h5>Register Test</h5>
              <p>Ready to get your labs? Fill out these details</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">First Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter your first name" {...register("first_name", { required: true })} required />
                      <div className="invalid-feedback">{errors.first_name && errors.first_name.message}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Residential Address<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter your address here" {...register("address", { required: true })} required />
                      <div className="invalid-feedback">{errors.address && errors.address.message}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date of Birth<span className="text-danger">*</span></label>
                      <input type="date" className="form-control" placeholder="YYYY-DD-MM" {...register("birth_date", { required: true })} required />
                      <div className="invalid-feedback">{errors.birth_date && errors.birth_date.message}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email Address<span className="text-danger">*</span></label>
                      <input type="email" className="form-control" placeholder="Enter your email address" {...register("email", { required: true })} required />
                      <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                    </div>
                    <p><Image src="/info-icon.png" width="21" height="21" alt="" /> In 24 hours your labs will be ready.</p>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Last Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter your last name" {...register("last_name", { required: true })} required />
                      <div className="invalid-feedback">{errors.last_name && errors.last_name.message}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile Number<span className="text-danger">*</span></label>
                      <PhoneInput international className="form-control" defaultCountry="US" placeholder="Enter phone number" value={mobile} onChange={handleMobileInput} />
                      <div className={Object.keys(errors).length ? "invalid-feedback d-block" : "invalid-feedback"}>{errors.mobile && errors.mobile.message}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Gender<span className="text-danger">*</span></label>
                      <select className="form-select" {...register("gender", { required: true })} required>
                        <option value="">Choose your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <div className="invalid-feedback">{errors.gender && errors.gender.message}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 text-end">
                    <Link href="/overview" className="btn btn-outline-secondary me-3">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Continue to Next Step</button>
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