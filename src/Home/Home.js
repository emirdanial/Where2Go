import React from 'react';

import Navbar from 'Components/Navbar.js';
import TopHeader from 'Components/TopHeader.js';
import Footer from 'Components/Footer.js';
import IndexTab from './IndexTab.js';
import EventSection from './EventSection.js';
import DealSection from './DealSection.js';
import ContestSection from './ContestSection.js';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Home extends React.Component {
  render() {
    return (
      <>
      <ToastContainer/>
      <div className="preloader d-flex align-items-center justify-content-center">
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      <header className="header-area">
        <TopHeader />
        <Navbar />
      </header>
      <section className="section-padding-100">
        <IndexTab/>
      </section>
      <section className="section-padding-100"  style={{backgroundColor:'#191c1d'}} >
        <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <EventSection/>
              </div>
              <div className="col-lg-6">
                <ContestSection/>
              </div>
            </div>
          </div>
      </section>
      <section className="section-padding-100">
      <div className="container">
        <DealSection/>
        </div>
      </section>
      <Footer />
      </>
    )
  }
}

export default Home;
      // <div className="preloader d-flex align-items-center justify-content-center">
      //     <div className="lds-ellipsis">
      //       <div />
      //       <div />
      //       <div />
      //       <div />
      //     </div>
      //   </div>

      // <section>
      // <div className="header-container">
      //     <img src={require('Components/header.jpg')} alt=".." className="bg-header"/>
      //     <div className="logo-container">
      //       <img src={require('Components/logo.png')} alt=".." className="logo-header"/>
      //       <h2>WHERE2GO</h2>
      //       <label className="apps-text">CHECK OUT TRENDING EVENTS, AMAZING CONTEST & GREAT DEALS</label>
      //     </div>
      // </div>
      // </section>


      // <section className="section-padding-80">
      //   <EventSection/>
      // </section>

          // <div className="container">
          //   <div className="row">
          //     <div className="col-lg-6">
          //       <ContestSection/>
          //     </div>
          //     <div className="col-lg-6">
          //       //<ContestSection/>
          //     </div>
          //   </div>
          // </div>


// {/* Preloader */}
//           <div className="preloader d-flex align-items-center justify-content-center">
//             <div className="lds-ellipsis">
//               <div />
//               <div />
//               <div />
//               <div />
//             </div>
//           </div>
//           {/* ##### Header Area Start ##### */}
//           <header className="header-area">
//           {/* Top Header Area */}
//             <TopHeader />
//           {/* Navbar Area */}
//             <Navbar />
//           </header>
//           {/* ##### Header Area End ##### */}
//           {/* ##### Hero Area Start ##### */}
// {/*          <section className="hero--area section-padding-80">
//               <HomeHeader />
//           </section>*/}
//           {/* ##### Hero Area End ##### */}
//           {/* ##### Trending Posts Area Start ##### */}
//           {/*<section className="trending-posts-area section-padding-80">
//               <Trending />
//           </section>*/}
//           {/* ##### Trending Posts Area End ##### */}
//           {/* ##### Vizew Post Area Start ##### */}
//           <section className="vizew-post-area mb-50 mt-5">
//             <div className="container">
//               <div className="row">
//                 <div className="all-posts-area">
//                   {/* Section Heading */}
//                   <div className="section-heading style-2">
//                     <h4>Event</h4>
//                     <div className="line" />
//                   </div>
//                   {/* Featured Post Slides */}
//                   <EventSlides />
//                   <div className="row">
//                     <div className="col-12 col-lg-6">
//                       {/* Section Heading */}
//                       <div className="section-heading style-2">
//                         <h4>Contest</h4>
//                         <div className="line" />
//                       </div>
//                       {/* Sports Video Slides */}
//                       <ContestSlides/>
//                       {/* Single Blog Post */}
//                       <div className="col-12">
//                         <div className="single-blog-post style-3 d-flex mb-50">
//                           <div className="post-thumbnail">
//                             <img src="img/bg-img/20.jpg" alt="" />
//                           </div>
//                           <div className="post-content">
//                             <a href="!#" className="post-cata cata-sm cata-danger">Contest</a>
//                             <a href="single-post.html" className="post-title">Do This One Simple Action for an Absolutely</a>
//                             <div className="post-meta d-flex justify-content-between">
//                               <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 16</a>
//                               <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 26</a>
//                               <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 17</a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       {/* Single Blog Post */}
//                       <div className="col-12">
//                         <div className="single-blog-post style-3 d-flex mb-50">
//                           <div className="post-thumbnail">
//                             <img src="img/bg-img/20.jpg" alt="" />
//                           </div>
//                           <div className="post-content">
//                             <a href="!#" className="post-cata cata-sm cata-danger">Contest</a>
//                             <a href="single-post.html" className="post-title">Do This One Simple Action for an Absolutely</a>
//                             <div className="post-meta d-flex justify-content-between">
//                               <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 16</a>
//                               <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 26</a>
//                               <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 17</a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12 col-lg-6">
//                       {/* Section Heading */}
//                       <div className="section-heading style-2">
//                         <h4>Deals</h4>
//                         <div className="line" />
//                       </div>
//                       {/* Business Video Slides */}
//                       <DealSlides />
//                       {/* Single Blog Post */}
//                       <div className="col-12">
//                         <div className="single-blog-post style-3 d-flex mb-50">
//                           <div className="post-thumbnail">
//                             <img src="img/bg-img/18.jpg" alt="" />
//                           </div>
//                           <div className="post-content">
//                             <a href="!#" className="post-cata cata-sm cata-primary">Deals</a>
//                             <a href="single-post.html" className="post-title">Paramedics 'drilled into boat death woman'</a>
//                             <div className="post-meta d-flex justify-content-between">
//                               <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 16</a>
//                               <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 26</a>
//                               <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 17</a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       {/* Single Blog Post */}
//                       <div className="col-12">
//                         <div className="single-blog-post style-3 d-flex mb-50">
//                           <div className="post-thumbnail">
//                             <img src="img/bg-img/18.jpg" alt="" />
//                           </div>
//                           <div className="post-content">
//                             <a href="!#" className="post-cata cata-sm cata-primary">Deals</a>
//                             <a href="single-post.html" className="post-title">Paramedics 'drilled into boat death woman'</a>
//                             <div className="post-meta d-flex justify-content-between">
//                               <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 16</a>
//                               <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 26</a>
//                               <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 17</a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>