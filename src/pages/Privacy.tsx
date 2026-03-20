import { Helmet } from 'react-helmet-async';
import OuterCard from '../components/CardComponents/OuterCard';

const Privacy = () => {
  return (
    <section className='px-6 md:px-10 py-8 md:py-12 flex justify-center'>
      <Helmet>
        <title>Privacy Policy – Janis Harms</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <OuterCard className='w-full max-w-3xl'>
        <h1 className='text-3xl md:text-4xl font-bold text-primary-white'>Privacy Policy</h1>
        <p className='mt-2 text-primary-grey text-sm'>Last updated: March 2026</p>

        <div className='mt-8 space-y-6 text-primary-grey'>

          <div>
            <h2 className='text-primary-white font-semibold mb-1'>Responsible</h2>
            <p>Janis Harms<br />CH<br />Contact <a href='/contact' className='hover:brightness-110'>here...</a></p>
          </div>

          <div>
            <h2 className='text-primary-white font-semibold mb-1'>Data collected</h2>
            <p>When you use the contact form, your name, email address and message are collected. This data is processed solely to respond to your inquiry and deleted afterwards.</p>
          </div>

          <div>
            <h2 className='text-primary-white font-semibold mb-1'>Third-party services</h2>
            <p>Form submissions are handled by <a href='https://formspree.io' target='_blank' rel='noopener noreferrer' className='text-primary hover:brightness-110'>Formspree</a> (USA). By submitting the form, you agree that your data is transferred to and processed by Formspree in accordance with their <a href='https://formspree.io/legal/privacy-policy' target='_blank' rel='noopener noreferrer' className='text-primary hover:brightness-110'>privacy policy</a>.</p>
          </div>

          <div>
            <h2 className='text-primary-white font-semibold mb-1'>Your rights</h2>
            <p>Under the Swiss Federal Act on Data Protection (revDSG), you have the right to access, correct, or delete your personal data. Contact me via the contact form to exercise these rights.</p>
          </div>

        </div>
      </OuterCard>
    </section>
  );
};

export default Privacy;
