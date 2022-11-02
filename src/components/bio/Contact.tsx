const Contact: React.FunctionComponent = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <p>
        If you wish to contact me, my contact details are below. I have also
        linked my Github if you are interested in my code!
      </p>
      <ol className='list-disc'>
        <li>
          <a
            className='link'
            target='_blank'
            href='https://www.linkedin.com/in/lee-sherwood-b93807ba'
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a className='link' href='https://github.com/leesherwood28'>
            Github
          </a>
        </li>
        <li>
          <a className='link ' href='mailto:leesherwood1@gmail.com'>
            leesherwood1@gmail.com
          </a>
        </li>
      </ol>
    </div>
  );
};

export default Contact;
