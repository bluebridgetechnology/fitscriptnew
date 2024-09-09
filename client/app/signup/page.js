"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    callFetch('auth/register', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      router.replace('/');
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Image src="/logo.png" className="img-fluid p-3" width="197" height="32" alt="" />
          <div className="row mt-5 pt-5">
            <div className="col-md-8 offset-md-2">
              <h1 className="h2 mb-4">Get Started Now</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate autoComplete="off">
                <div className="mb-4">
                  <label className="form-label fw-bold">First Name</label>
                  <input type="text" className="form-control" placeholder="Enter your first name" {...register("first_name", { required: true })} required />
                  <div className="invalid-feedback">{errors.first_name && errors.first_name.message}</div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Last Name</label>
                  <input type="text" className="form-control" placeholder="Enter your last name" {...register("last_name", { required: true })} required />
                  <div className="invalid-feedback">{errors.last_name && errors.last_name.message}</div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Email</label>
                  <input type="email" className="form-control" placeholder="Enter your email" {...register("email", { required: true })} required />
                  <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Password</label>
                  <input type="password" className="form-control" placeholder="Enter your password" {...register("password", { required: true })} required />
                  <div className="invalid-feedback">{errors.password && errors.password.message}</div>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" required />
                  <label className="form-check-label" htmlFor="gridCheck">
                    I agree to the <Link href="/">terms & policy</Link>
                  </label>
                </div>
                <button type="submit" className="btn btn-primary d-block w-100 fw-bold mt-4">Sign up</button>
              </form>
              <hr className="hr-text my-4" data-content="Or" />
              <p className="text-center">Already have an account? <Link href="/" className="fw-bold text-black text-decoration-none">Sign In</Link></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block p-0">
          <Image src="/login.jpg" className="img-fluid" width="1000" height="1000" priority={true} alt="" />
        </div>
      </div>
    </div>
  );
}
