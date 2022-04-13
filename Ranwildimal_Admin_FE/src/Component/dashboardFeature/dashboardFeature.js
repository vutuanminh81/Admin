import React from 'react'
import "./dashboardFeature.css"
function dashboardFeature() {
  return (
    <div className='featured'>
        <div className='featureItem'>
            <span className='featuredTitle'>Total Words</span>
            <div className='featuredNumberContainer'>
                <span className='featureNumber'>10</span>
                <span className='featureReport'>20</span>
            </div>
            <div>
                <span className='featureSub'>Compare to last month</span>
            </div>
        </div>
        <div className='featureItem'>
            <span className='featuredTitle'>Scan Fail</span>
            <div className='featuredNumberContainer'>
                <span className='featureNumber'>10</span>
                <span className='featureReport'>20</span>
            </div>
            <div>
                <span className='featureSub'>Compare to last month</span>
            </div>
        </div>
        <div className='featureItem'>
            <span className='featuredTitle'>M</span>
            <div className='featuredNumberContainer'>
                <span className='featureNumber'>10</span>
                <span className='featureReport'>20</span>
            </div>
            <div>
                <span className='featureSub'>Compare to last month</span>
            </div>
        </div>
    </div>
  )
}

export default dashboardFeature