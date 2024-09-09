"use client"
import callFetch from '@/helpers/callFetch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BloodDrawn() {
  const router = useRouter();

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
                  <p className="text-center"><Image src="/circle-numbers/3-fill.png" width="40" height="40" alt="" /><br />Blood Draw</p>
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
              <h5>Requisition</h5>
              <p>It takes 18 to 21 days</p>
              <p className="text-center fw-bold">Download now to get your blood drawn</p>
              <p className="text-center"><a href="/" download="blood-draw.pdf" className="btn btn-primary">Download PDF</a></p>
              <p className="text-center fw-bold mt-4 mb-0">Clinic Address:</p>
              <p className="text-center">962 Cartwright Square, New Betty, Missouri, USA</p>
              <div className="text-center">
                <video width="100%" height="auto" controls>
                  <source src="https://videos.pexels.com/video-files/3209300/3209300-hd_1280_720_25fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pb-5">
        <div className="col-md-12 text-end">
          <Link href="/overview/review-video" className="btn btn-primary">Watch Review Video</Link>
        </div>
      </div>
    </div >
  );
}