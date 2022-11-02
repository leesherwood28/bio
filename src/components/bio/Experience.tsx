const Experience: React.FunctionComponent = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h2 className='text-deep-gray mb-0 pb-0'>Dorset Software</h2>
      <span className='text-sm italic mb-4'>2015 - Present</span>

      <p>
        Dorset Software provides IT consultancy as a service to clients. During
        my time at Dorset Software I have worked with a variety of clients on
        different project roles, increasing my soft and technical skills through
        the process.
      </p>

      <h3 className='text-deep-gray mb-0 pb-0'>Front End Developer</h3>

      <p className='mb-4'>
        This role has involved me working as a front end developer on a complex
        traffic management system. The project has involved many facets
        including:
      </p>

      <ul className='list-disc ml-4'>
        <li>Migrating a huge AngularJS application to Angular.</li>
        <li>
          Architecting existing code into generic reusuable controls and
          functionality inside sharable libraries as part of the NX architecture
          model.
        </li>
        <li>
          UX design work, breaking down user requirements and then designing new
          screen functionality and workflows to fit user needs.
        </li>
        <li>Implementing new feature work and bug fixes.</li>
        <li>
          Working as part of a large team in an organisation with many moving
          parts.
        </li>
      </ul>
      <p className='mb-2'>
        The project has offered me many unique challenges and opportunities that
        have helped me grow in experience and competence. I have grown to love
        working on hard problems and being challenged technically and look
        forward to any new future challenges that come my way.
      </p>

      <h4 className='mb-2 pb-0 pt-0'>Stack</h4>
      <StackCollection>
        <StackChip text='Angular' />
        <StackChip text='NX' />
        <StackChip text='NGXS' />
        <StackChip text='D3' />
        <StackChip text='Leaflet' />
      </StackCollection>

      <h3 className='text-deep-gray mb-0 pb-0'>Programming Mentor</h3>

      <p className='mb-4'>
        This role involved training new starters to the organisation to the
        level of full stack developers and professional consultants over a
        training period. The role included:
      </p>
      <ul className='list-disc ml-4'>
        <li>Introducing trainees to programming concepts and tools.</li>
        <li>Guiding trainees through the structured training material.</li>
        <li>On hand assistance with bug fixes and debugging.</li>
        <li>Weekly updates to report on trainee progress.</li>
        <li>Building trainee soft skills and professionality.</li>
        <li>Reviewing trainee code and giving guidance for improvement.</li>
      </ul>
      <p className='mb-2'>
        The nature of this role, with its core focus on training individuals has
        helped me develop myself into a more well rounded programmer with both
        technical and interpersonal skills. I have become more comfortable
        giving guidance to peers and taking positions that require
        responsibility and leadership.
      </p>

      <h4 className='mb-2 pb-0 pt-0'>Stack</h4>
      <StackCollection>
        <StackChip text='.NET Framework' />
        <StackChip text='SQL Database' />
        <StackChip text='ASP.NET' />
        <StackChip text='Javascript' />
      </StackCollection>

      <h3 className='text-deep-gray pb-0 mb-0'>
        Database and Infrastructure Migration
      </h3>

      <p className='mb-2'>
        This project involved migration of a complex banking system to new
        infrastructure and a new SQL server environment. The role consisted of:
      </p>
      <ul className='list-disc ml-4 mb-2'>
        <li>Performance optimisation of slow SQL scripts.</li>
        <li>
          Rewriting archiving processes so that they are less blocking and more
          resilient to concurrency issues.
        </li>
        <li>
          Rewriting several database tools to optimise performance in the new
          environment.
        </li>
        <li>Identifying all breaking changes for migration and fixing them.</li>
      </ul>

      <h4 className='mb-2 pb-0 pt-0'>Stack</h4>
      <StackCollection>
        <StackChip text='SQL Server' />
        <StackChip text='Powershell' />
      </StackCollection>

      <h2 className='text-deep-gray'>Personal Projects</h2>
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
        <a href='https://www.brleagues.com/' className='link' target='_blank'>
          https://www.brleagues.com
        </a>
        .
      </p>
      <h4 className='mb-2 pb-0 pt-0'>Stack</h4>
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
        <a href='https://landlo.web.app' className='link' target='_blank'>
          https://landlo.web.app
        </a>
        .
      </p>
      <h4 className='pt-0 pb-0 mb-2'>Stack</h4>
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
        <a href='https://southernwalltech.com' className='link' target='_blank'>
          https://southernwalltech.com
        </a>
        .
      </p>
      <h4 className='pt-0 pb-0 mb-2'>Stack</h4>
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
          >
            Stack Blitz Link
          </a>
        </li>
      </ul>
    </div>
  );
};

interface StackCollectionParams {
  children: React.ReactNode;
}
const StackCollection: React.FunctionComponent<StackCollectionParams> = ({
  children,
}) => {
  return (
    <div className='flex flex-wrap mb-8 justify-center gap-4'>{children}</div>
  );
};

interface StackChipParams {
  text: string;
}
const StackChip: React.FunctionComponent<StackChipParams> = ({ text }) => {
  return <div className='bg-white text-black rounded-full px-2 '>{text}</div>;
};

export default Experience;
