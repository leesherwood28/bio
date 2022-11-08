import StackChip from './StackChip';
import StackCollection from './StackCollection';

const PersonalExperience: React.FunctionComponent = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <p>
        I enjoy programming outside of work. I have engaged in a number of
        personal projects with the aim of improving my skills and delivering a
        potentially valuable product.
      </p>

      <h3 className='text-deep-gray'>BR Leagues</h3>
      <p className='mb-2'>
        This is a mobile-first tournament tracking app for the game Warzone, the
        application automatically records player games, processes scores and
        displays them to users through a web app.
        <br />
        <br />I have written the front end in Ionic with the intention of the
        application being cross platform. The server is written in express JS
        and we use firestore for the data persistence, which I have found to be
        excellent. You will find the current application at:
        <br />
        <a
          href='https://www.brleagues.com/'
          className='link'
          target='_blank'
          rel='noreferrer'
        >
          https://www.brleagues.com
        </a>
        .
      </p>
      <StackCollection>
        <StackChip text='Angular' />
        <StackChip text='Ionic' />
        <StackChip text='Capacitor' />
        <StackChip text='Firebase Firestore' />
        <StackChip text='Firebase Authentication' />
        <StackChip text='ExpressJS' />
      </StackCollection>

      <h3 className='text-deep-gray'>Landlo</h3>
      <p className='mb-2'>
        The original intention of this project was to grow my own technical
        abilities by creating a web based rent management application for my
        Father.
        <br />
        <br />
        This project has greatly improved my programming skills, allowing me to
        practically try out a range of different technologies and techniques for
        full stack development, seeing their advantages and disadvantages once
        applied. I am confident that I have found a nice mix of excellent
        technologies that I would be preferential in choosing in future app
        work.
        <br />
        <br />
        The project has grown in scope since its origins, with my current
        intention to make it a public app for rent management. You will find the
        current working progress at:
        <br />
        <a
          href='https://landlo.web.app'
          className='link'
          target='_blank'
          rel='noreferrer'
        >
          https://landlo.web.app
        </a>
        .
      </p>
      <StackCollection>
        <StackChip text='Angular' />
        <StackChip text='Capacitor' />
        <StackChip text='Firebase Firestore' />
        <StackChip text='Firebase Functions' />
        <StackChip text='Firebase Authentication' />
      </StackCollection>

      <h3 className='text-deep-gray'>Southern Wall Tech</h3>
      <p className='mb-2'>
        This is a business site I made for my older brother for his new company.
        I wanted to both make the site SEO optimised and get some React
        experience so I made this site with NextJs. You can view the site at:
        <br />
        <a
          href='https://southernwalltech.com'
          className='link'
          target='_blank'
          rel='noreferrer'
        >
          https://southernwalltech.com
        </a>
        .
      </p>
      <StackCollection>
        <StackChip text='React' />
        <StackChip text='NextJs' />
        <StackChip text='React Spring' />
      </StackCollection>

      <h2 className='text-deep-gray'>Technical Challenges</h2>

      <p>
        I enjoy a challenge and would like to demonstrate my technical
        competency, here are a few examples of such:
      </p>

      <ul className='list-disc ml-4 mb-2'>
        <li>
          Gesture friendly (swipeable) material inspired tabs, with rxjs powered
          animations:
          <a
            href='https://stackblitz.com/edit/angular-hmvgzg?file=src/app/swiper-tabs/swiper-tab-group/swiper-tab-group.component.ts'
            className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600 '
            target='_blank'
            rel='noreferrer'
          >
            Stack Blitz Link
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PersonalExperience;
