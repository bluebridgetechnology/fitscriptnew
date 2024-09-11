"use client"
import Image from 'next/image';
import Link from 'next/link';
import { CircleDollarSign, Users, MoreVertical } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <div className="card rounded-4 border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Total Supplement</h6>
                    <button className="btn btn-link p-0 text-muted">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <CircleDollarSign size={24} className="text-success me-2" />
                    <h2 className="mb-0">230</h2>
                  </div>
                  <p className="text-success mb-0 mt-2"><span className="me-2">↑ 30%</span> vs last month</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card rounded-4 border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Total Appointments</h6>
                    <button className="btn btn-link p-0 text-muted">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <Users size={24} className="text-primary me-2" />
                    <h2 className="mb-0">32</h2>
                  </div>
                  <p className="text-danger mb-0 mt-2"><span className="me-2">↓ 20%</span> vs last month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded-4 border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Lite Plan <span className="badge bg-success">Active</span></h5>
                <span className="text-muted">Expires in 56 days</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">$6000 <small className="text-muted">/ Per 3 Months</small></h2>
                <Link href="/upgrade" className="btn btn-primary">Upgrade plan ↗</Link>
              </div>
              <p className="card-text mt-3 mb-0"><small className="text-muted">Renew on 03/04/2024</small></p>
            </div>
          </div>
          <div className="card rounded-4 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title mb-4">FitScore</h5>
              <div className="position-relative d-inline-block">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" strokeWidth="12"/>
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#D5E91A" strokeWidth="12" strokeDasharray="565.48" strokeDashoffset="305.36" strokeLinecap="round"/>
                </svg>
                <div className="position-absolute top-50 start-50 translate-middle">
                  <h1 className="display-4 fw-bold mb-0">46</h1>
                  <p className="text-muted">out of 100</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/details" className="btn btn-primary btn-lg">Get More Details</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card rounded-4 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Upcoming</h5>
                <Link href="/all-events" className="btn btn-sm" style={{ backgroundColor: '#D5E91A', color: '#000000' }}>View all</Link>
              </div>
              <div className="upcoming-events">
                <div className="event mb-3">
                  <div className="d-flex align-items-center">
                    <div className="event-color" style={{ width: '4px', height: '40px', backgroundColor: '#FF69B4', marginRight: '10px' }}></div>
                    <div>
                      <p className="mb-0 text-muted">Consultation</p>
                      <h6 className="mb-0">Cameron Williamson</h6>
                      <small className="text-muted">12 AM - 13 AM | 20/03/2024</small>
                    </div>
                  </div>
                </div>
                <div className="event mb-3">
                  <div className="d-flex align-items-center">
                    <div className="event-color" style={{ width: '4px', height: '40px', backgroundColor: '#FF69B4', marginRight: '10px' }}></div>
                    <div>
                      <p className="mb-0 text-muted">Consultation</p>
                      <h6 className="mb-0">Wade Warren</h6>
                      <small className="text-muted">12 AM - 13 AM | 25/03/2024</small>
                    </div>
                  </div>
                </div>
                <div className="event mb-3">
                  <div className="d-flex align-items-center">
                    <div className="event-color" style={{ width: '4px', height: '40px', backgroundColor: '#4169E1', marginRight: '10px' }}></div>
                    <div>
                      <p className="mb-0 text-muted">Meeting</p>
                      <h6 className="mb-0">Wade Warren</h6>
                      <small className="text-muted">12 AM - 13 AM | 29/03/2024</small>
                    </div>
                  </div>
                </div>
                <div className="event">
                  <div className="d-flex align-items-center">
                    <div className="event-color" style={{ width: '4px', height: '40px', backgroundColor: '#4169E1', marginRight: '10px' }}></div>
                    <div>
                      <p className="mb-0 text-muted">Meeting</p>
                      <h6 className="mb-0">Wade Warren</h6>
                      <small className="text-muted">12 AM - 13 AM | 29/03/2024</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


