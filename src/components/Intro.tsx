const Intro: React.FunctionComponent = () => {
  return (
    <div
      className='
w-full h-full absolute
  bg-black
  grid grid-cols-1 grid-rows-2
  md:grid-rows-3 md:grid-cols-3
  place-items-center
  text-white
'
    >
      <div
        className='
    font-anton
    text-white-smoke text-8xl
    place-self-stretch
    flex
    items-center
    justify-center
    md:row-start-2 md:col-start-2
  '
      >
        <span className='text-yellow-600 animate__animated animate__backInLeft'>
          &lt;
        </span>
        <span
          className='
      px-8
      animate__animated animate__bounceIn animate__delay-750ms
    '
        >
          /
        </span>
        <span className='text-yellow-600 animate__animated animate__backInRight'>
          &gt;
        </span>
      </div>

      <div
        className='
    text-white-smoke
    font-montserrat
    text-3xl
    self-start
    md:place-self-stretch md:row-start-3 md:col-start-3
  '
      >
        <div
          className='
      mb-4
      animate__animated animate__fadeIn animate__delay-1500ms
    '
        >
          Lee Sherwood
        </div>
        <div
          className='
      animate__animated animate__fadeIn animate__delay-2500ms
      italic
      text-yellow-600 text-2xl
    '
        >
          Web Developer
        </div>
      </div>
    </div>
  );
};

export default Intro;
