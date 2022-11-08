import Image from 'next/image';

const ImageSize = 220;

const Education: React.FunctionComponent = () => {
  return (
    <div className='text-center flex flex-col items-center gap-8'>
      <h2 className='mb-0 pb-0'>Durham University</h2>
      <span className='text-sm italic mb-4'>2011 - 2015</span>
      <Image
        width={ImageSize}
        height={ImageSize}
        className=' rounded-full'
        src='/bio/durham.jpg'
        alt='Picture of Durham Graduates'
      />

      <p>
        I Achieved a 2:1 Masters Degree in Mathematics at Durham University. I
        specialised in pure mathematics and completed my thesis on the Riemann
        Zeta function and its relation to the distribution of prime numbers.
      </p>

      <h2>A level</h2>
      <p className='mb-4'>I got the following A Level results</p>

      <ul>
        <li>Maths: A*</li>
        <li>Further Maths: A*</li>
        <li>Physics: A*</li>
        <li>Chemistry: B</li>
      </ul>
    </div>
  );
};

export default Education;
