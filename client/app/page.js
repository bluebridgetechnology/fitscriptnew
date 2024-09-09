"use client"
import callFetch from '@/helpers/callFetch';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function Signin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const cookieValue = Cookies.get('access-token');
    if (cookieValue && cookieValue.length)
      router.replace('/overview');
  }, []);

  const onSubmit = (formData) => {
    callFetch('auth/login', "POST", formData, setError).then((res) => {
      if (!res.ok) return;
      Cookies.set('access-token', res.token, { expires: 30, secure: false });
      router.replace('/overview');
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Image src="/logo.png" className="img-fluid p-3" width="197" height="32" alt="" />
          <div className="row mt-5 pt-5">
            <div className="col-md-8 offset-md-2">
              <h1 className="h2 mt-5">Welcome back!</h1>
              <p className="mb-5">Enter your Credentials to access your account</p>
              <form onSubmit={handleSubmit(onSubmit)} className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} noValidate autoComplete="off">
                <div className="mb-4">
                  <label className="form-label fw-bold">Email</label>
                  <input type="email" className="form-control" placeholder="Enter your email" {...register("email", { required: true })} required />
                  <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Password</label>
                  <input type="password" className="form-control" placeholder="Enter your password" {...register("password", { required: true })} required />
                  <div className="invalid-feedback">{errors.password && errors.password.message}</div>
                  <div className="form-text"><Link href="/" className="text-decoration-none text-black fw-medium">Forgot password?</Link></div>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" defaultChecked />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Remember for 30 days
                  </label>
                </div>
                <button type="submit" className="btn btn-primary d-block w-100 fw-bold mt-4">Sign in</button>
              </form>
              <hr className="hr-text my-4" data-content="Or" />
              <p className="text-center">Don’t have an account? <Link href="/signup" className="fw-bold text-black text-decoration-none">Sign Up</Link></p>
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
