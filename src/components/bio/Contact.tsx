const Contact: React.FunctionComponent = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h2>Links</h2>
      <p>
        If you wish to contact me, my contact details are below. I have also
        linked my Github if you are interested in my code!
      </p>
      <div className='grid grid-cols-2 gap-y-6 gap-x-4 text-sm'>
        <a
          className='link'
          href='https://www.linkedin.com/in/lee-sherwood-b93807ba'
        >
          <i className='fab fa-linkedin mr-4' aria-hidden='true'></i>LinkedIn
        </a>
        <a className='link' href='https://github.com/leesherwood28'>
          <i className='fab fa-github mr-4' aria-hidden='true'></i>Github
        </a>
        <a className='link col-span-2' href='mailto:leesherwood1@gmail.com'>
          <i className='fa fa-envelope mr-4' aria-hidden='true'></i>
          leesherwood1@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Contact;
