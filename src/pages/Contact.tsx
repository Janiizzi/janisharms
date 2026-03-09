import { Helmet } from 'react-helmet-async';
import { useForm, ValidationError } from '@formspree/react';
import OuterCard from '../components/CardComponents/OuterCard';

const Contact = () => {
  const [state, handleSubmit] = useForm('mwvrebwo');

  if (state.succeeded) {
    return (
      <section className='px-6 md:px-10 py-8 md:py-12 flex justify-center'>
        <OuterCard className='w-full max-w-3xl'>
          <h1 className='text-3xl md:text-4xl font-bold text-primary-white'>
            <span className='type-line' style={{ animationDelay: '0.05s' }}>
              Contact
            </span>
          </h1>
          <p className='mt-6 text-secondary'>Message sent successfully. Thank you!</p>
        </OuterCard>
      </section>
    );
  }

  return (
    <section className='px-6 md:px-10 py-8 md:py-12 flex justify-center'>
      <Helmet>
        <title>Contact – Janis Harms</title>
        <meta name='description' content='Get in touch with Janis Harms. Send a message directly via the contact form.' />
        <link rel='canonical' href='https://janisharms.ch/contact' />
      </Helmet>
      <OuterCard className='w-full max-w-3xl'>
        <h1 className='text-3xl md:text-4xl font-bold text-primary-white'>
          <span className='type-line' style={{ animationDelay: '0.05s' }}>
            Contact
          </span>
        </h1>
        <p className='mt-3 text-primary-grey'>
          Send me a message and I will get back to you.
        </p>

        <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <label className='flex flex-col gap-2'>
              <span className='text-sm text-primary-grey'>Name</span>
              <input
                id='name'
                name='name'
                type='text'
                required
                className='rounded-lg border border-primary-white/20 bg-primary-background/70 px-4 py-3 text-primary-white outline-none focus:border-primary'
                placeholder='Your name'
              />
            </label>

            <label className='flex flex-col gap-2'>
              <span className='text-sm text-primary-grey'>Email</span>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='rounded-lg border border-primary-white/20 bg-primary-background/70 px-4 py-3 text-primary-white outline-none focus:border-primary'
                placeholder='your@email.com'
              />
              <ValidationError
                prefix='Email'
                field='email'
                errors={state.errors}
                className='text-primary text-sm'
              />
            </label>
          </div>

          <label className='flex flex-col gap-2'>
            <span className='text-sm text-primary-grey'>Subject</span>
            <input
              id='subject'
              name='subject'
              type='text'
              required
              className='rounded-lg border border-primary-white/20 bg-primary-background/70 px-4 py-3 text-primary-white outline-none focus:border-primary'
              placeholder='How can I help?'
            />
          </label>

          <label className='flex flex-col gap-2'>
            <span className='text-sm text-primary-grey'>Message</span>
            <textarea
              id='message'
              name='message'
              required
              rows={6}
              className='rounded-lg border border-primary-white/20 bg-primary-background/70 px-4 py-3 text-primary-white outline-none focus:border-primary resize-y'
              placeholder='Write your message...'
            />
            <ValidationError
              prefix='Message'
              field='message'
              errors={state.errors}
              className='text-primary text-sm'
            />
          </label>

          <button
            type='submit'
            disabled={state.submitting}
            className='inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-white transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {state.submitting ? 'Sending...' : 'Send message'}
          </button>

          <ValidationError
            errors={state.errors}
            className='text-primary text-sm'
          />
        </form>
      </OuterCard>
    </section>
  );
}

export default Contact