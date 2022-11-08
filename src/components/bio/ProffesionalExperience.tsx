import StackChip from './StackChip';
import StackCollection from './StackCollection';

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
    </div>
  );
};

export default Experience;
