import Image from 'next/image';
import Link from 'next/link';

export default function Overview() {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h3">Hello, Michael</h1>
          <p>Let’s take a look & complete your diagnostic journey today.</p>
          <div className="card rounded-4 border-0">
            <div className="card-body">
              <h6><Image src="/diagnostic-journey-icon.png" className="me-1" width="18" height="18" alt="" /> Your Diagnostic Journey</h6>
              <hr />
              <div className="row pt-3 fit-steps">
                <div className="col-md-2 offset-md-1" style={{ backgroundPositionX: '75px' }}>
                  <p className="text-center"><Image src="/circle-numbers/1.png" width="40" height="40" alt="" /><br />Register Test</p>
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

          <div className="card rounded-4 border-0 mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-1 text-center">
                  <Image src="/1.png" width="45" height="45" alt="" />
                </div>
                <div className="col-md-9">
                  <h6 className="m-0">Register Test</h6>
                  <p className="m-0">Please register your Fitscript Diagnostic blood test.</p>
                </div>
                <div className="col-md-2 text-end">
                  <Link href="/overview/registertest" className="btn btn-primary mt-1 d-block">Register Test</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="card rounded-4 border-0 my-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-1 text-center">
                  <Image src="/2.png" width="45" height="45" alt="" />
                </div>
                <div className="col-md-9">
                  <h6 className="m-0">Health Questionnaire</h6>
                  <p className="m-0" style={{ fontSize: '0.9rem' }}>It will take about 20 minutes (but it just might add years to your life), and you can “save and exit” and come back if get pulled away. We ask that you submit within two days of your blood draw so we can get to work.</p>
                </div>
                <div className="col-md-2 text-end">
                  <Link href="#" className="btn btn-primary mt-3 d-block" style={{ fontSize: '0.9rem' }}>Take Questionnaire</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}