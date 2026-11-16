import React, { useEffect, useState } from 'react';

const services = [
  { number: '01', name: 'Event management', detail: 'Corporate events, launches, conferences and gala dinners planned and run end to end.', icon: 'spark' },
  { number: '02', name: 'Wedding décor', detail: 'Styling, floral and structural décor tailored to each celebration.', icon: 'flower' },
  { number: '03', name: 'Live concert management', detail: 'Stage, sound, artists and logistics for live concert productions.', icon: 'music' },
  { number: '04', name: 'Exhibition stands', detail: 'Stand design, fabrication and installation for trade shows and exhibitions.', icon: 'grid' },
  { number: '05', name: 'Metal fabrication', detail: 'Custom structures, signage, stages and set pieces built to specification.', icon: 'cube' },
  { number: '06', name: 'Talent & celebrity management', detail: 'Artists, performers and public figures sourced and coordinated.', icon: 'star' },
  { number: '07', name: 'Media production', detail: 'Song, film, podcast, broadcast and commercial production support.', icon: 'play' },
  { number: '08', name: 'Advertising & print', detail: 'Banners, vinyl graphics, billboards and signage produced and installed.', icon: 'print' },
];

const projects = [
  { title: 'Ethiopian Airlines New Route Launch', category: 'Corporate events', scope: 'Corporate event · Dubai · 2025', image: '/portfolio-ethiopian.png', position: 'center' },
  { title: 'Perfume Launch at DWTC', category: 'Corporate events', scope: 'Product launch · Dubai World Trade Centre', image: '/portfolio-perfume.png', position: 'center' },
  { title: 'Double-storey Exhibition Stand', category: 'Exhibitions', scope: 'Design, fabrication & build · Dubai', image: '/portfolio-exhibition.png', position: 'center' },
  { title: 'Wedding Stage & Floral Backdrop', category: 'Weddings', scope: 'Wedding décor · Dubai', image: '/portfolio-wedding.png', position: 'center' },
  { title: 'Live Concert — Coca-Cola Arena', category: 'Concerts', scope: 'Live entertainment · Dubai', image: '/portfolio-concert.png', position: 'center' },
  { title: 'Custom Metal Bar Stools', category: 'Fabrication', scope: 'Metal and event fabrication · Dubai', image: '/portfolio-fabrication.png', position: 'center' },
];

const process = [
  ['01', 'Brief & discovery', 'Objectives, audience, venue, timeline and budget defined.'],
  ['02', 'Concept & costing', 'Creative direction, layouts and a clear quotation.'],
  ['03', 'Planning & coordination', 'Schedules, vendors, approvals and operations aligned.'],
  ['04', 'Production & build', 'Fabrication, printing, technical setup and rehearsals.'],
  ['05', 'Live execution', 'On-site operations managed from load-in to close.'],
  ['06', 'Handover & wrap-up', 'Dismantling, handover and post-project reporting.'],
];

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    arrow: <><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 18l2.3-.7L19 16Z"/></>,
    flower: <><circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C8.5 6.5 5 7.7 5 10.5c0 2.2 2.2 3.3 4.8 1.5C6.5 15.5 7.7 19 10.5 19c2.2 0 3.3-2.2 1.5-4.8 3.5 3.3 7 2.1 7-0.7 0-2.2-2.2-3.3-4.8-1.5 3.3-3.5 2.1-7-.7-7-2.2 0-3.3 2.2-1.5 4.8Z"/></>,
    music: <><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></>,
    grid: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></>,
    cube: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
    star: <path d="m12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z"/>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none"/></>,
    print: <><path d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v6H7z"/><path d="M17 12h.01"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <path d="M7.5 3.5 5.1 5.1c-1 1-.3 3.9 2.2 7.1 2.5 3.2 5.1 5.1 6.4 5l2.6-1.4-2.1-3.1-1.8.8c-1.1-.5-2.2-1.5-3.1-2.7-.9-1.2-1.5-2.5-1.7-3.7l1.5-1.3-1.6-2.3Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
  };
  return <svg {...common}>{paths[name] || paths.arrow}</svg>;
}

function Wordmark({ compact = false }) {
  return (
    <a href="#top" className={`wordmark ${compact ? 'wordmark--compact' : ''}`} aria-label="FS Flow home">
      <img src="/fs-flow-logo.png" alt="FS Flow Project Management" />
    </a>
  );
}

function Button({ children, kind = 'primary', onClick, href, className = '' }) {
  const content = <>{children}<span className="button-icon"><Icon name="arrow" size={17}/></span></>;
  return href ? <a className={`button button--${kind} ${className}`} href={href}>{content}</a> : <button className={`button button--${kind} ${className}`} onClick={onClick}>{content}</button>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All work');
  const [selectedProject, setSelectedProject] = useState(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const escape = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); setSelectedProject(null); setQuoteOpen(false); }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);

  const visibleProjects = filter === 'All work' ? projects : projects.filter((project) => project.category === filter);
  const closeMenu = () => setMenuOpen(false);
  const openQuote = () => { setSent(false); setQuoteOpen(true); closeMenu(); };

  return (
    <main id="top">
      <div className="page-noise" aria-hidden="true"/>
      <header className="site-header">
        <Wordmark compact />
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} size={23}/>
        </button>
        <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Primary navigation">
          <a href="#about" onClick={closeMenu}>Who we are</a>
          <a href="#expertise" onClick={closeMenu}>Expertise</a>
          <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <button className="nav-quote" onClick={openQuote}>Get a quote <Icon name="arrow" size={15}/></button>
        </nav>
      </header>

      <section className="hero section-shell">
        <div className="hero-grid" aria-hidden="true"/>
        <div className="eyebrow"><span/>Dubai · UAE</div>
        <div className="hero-copy">
          <p className="kicker">Vision to reality.</p>
          <h1>Experiences,<br/><i>executed</i> brilliantly.</h1>
          <p className="hero-description">Events, exhibitions, fabrication and creative production—connected by one accountable team in Dubai.</p>
          <div className="hero-actions">
            <Button href="#portfolio">Explore our work</Button>
            <Button kind="text" onClick={openQuote}>Start a project</Button>
          </div>
        </div>
        <div className="hero-stack" aria-label="FS Flow areas of work">
          <span>Events</span><span>Exhibitions</span><span>Fabrication</span><span>Talent & media</span><span>Advertising & print</span>
        </div>
        <div className="scroll-note"><i/> Scroll to discover</div>
        <div className="hero-orb" aria-hidden="true"><div className="orb-ring orb-ring--one"/><div className="orb-ring orb-ring--two"/><div className="orb-center"><span>FS</span><small>FLOW</small></div></div>
      </section>

      <section id="about" className="intro section-shell">
        <div className="section-label"><span>01</span> Who we are</div>
        <div className="intro-grid">
          <div><h2>One team.<br/>Every detail.<br/><i>Complete execution.</i></h2></div>
          <div className="intro-copy">
            <p>FS Flow Project Management is a Dubai-based event and creative production company delivering integrated solutions across events, exhibitions, fabrication, talent management, media production and advertising.</p>
            <p>From initial concept to on-site execution, we combine creative thinking, technical coordination and operational expertise to deliver experiences that connect people, brands and spaces.</p>
            <a className="underlink" href="#process">How we work <Icon name="arrow" size={16}/></a>
          </div>
        </div>
        <div className="value-row">
          {[
            ['01', 'Creative planning', 'Concepts, layouts and production plans shaped around your brief.'],
            ['02', 'Reliable partners', 'Vendors and suppliers coordinated by one operations team.'],
            ['03', 'On-time delivery', 'Detailed schedules and clear communication through every stage.'],
          ].map(([number, title, detail]) => <article className="value-card" key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
      </section>

      <section id="expertise" className="services section-shell">
        <div className="section-heading"><div><div className="section-label"><span>02</span> Our expertise</div><h2>Ideas need more than<br/><i>one good department.</i></h2></div><p>Every service line is connected to the same experienced project team—so planning, production and execution stay in sync.</p></div>
        <div className="service-grid">
          {services.map((service) => <article className="service-card" key={service.number}><div className="service-card-top"><span className="service-number">{service.number}</span><span className="service-icon"><Icon name={service.icon}/></span></div><h3>{service.name}</h3><p>{service.detail}</p><button onClick={openQuote} aria-label={`Ask about ${service.name}`}><Icon name="arrow" size={17}/></button></article>)}
        </div>
        <div className="service-footnote"><span>Full-service delivery</span><p>Celebrity & talent management · Song & film production · Podcast production · Broadcasting · Commercial product shoots · Flex and banner printing · Vinyl printing · Billboard installation</p></div>
      </section>

      <section id="portfolio" className="portfolio section-shell">
        <div className="portfolio-heading"><div><div className="section-label"><span>03</span> Selected work</div><h2>Work that makes<br/><i>an entrance.</i></h2></div><Button kind="outline" onClick={openQuote}>Discuss a project</Button></div>
        <div className="portfolio-tabs" role="tablist" aria-label="Filter portfolio projects">
          {['All work', 'Corporate events', 'Exhibitions', 'Weddings', 'Concerts', 'Fabrication'].map((category) => <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} role="tab" aria-selected={filter === category}>{category}</button>)}
        </div>
        <div className="portfolio-grid">
          {visibleProjects.map((project, index) => <article className={`project-card project-card--${(index % 3) + 1}`} key={project.title}><button onClick={() => setSelectedProject(project)} aria-label={`View ${project.title}`}><img src={project.image} alt="" style={{objectPosition: project.position}}/><span className="project-shade"/><span className="project-arrow"><Icon name="arrow" size={18}/></span><div className="project-copy"><p>{project.category}</p><h3>{project.title}</h3><small>{project.scope}</small></div></button></article>)}
        </div>
        <p className="portfolio-note">Project photography and categories shown from the supplied FS Flow company portfolio.</p>
      </section>

      <section id="process" className="process section-shell">
        <div className="process-top"><div><div className="section-label"><span>04</span> From brief to handover</div><h2>Designed to flow.<br/><i>Built to deliver.</i></h2></div><p>One clear process, one schedule and one point of contact from start to finish.</p></div>
        <div className="process-grid">{process.map(([number, title, detail]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
      </section>

      <section className="statement section-shell">
        <div className="statement-graphic" aria-hidden="true"><span className="sg sg-a"/><span className="sg sg-b"/><span className="sg sg-c"/><span className="sg sg-d"/></div>
        <p className="statement-overline">Integrated solutions</p>
        <h2>One accountable team.<br/><i>One exceptional outcome.</i></h2>
        <Button onClick={openQuote}>Request a quotation</Button>
      </section>

      <section id="contact" className="contact section-shell">
        <div className="contact-inner"><div><div className="section-label"><span>05</span> Let’s get started</div><h2>Bring your next<br/><i>big idea to life.</i></h2><p>Tell us your date, venue, expected guests and objective. We’ll reply with a plan and quotation.</p><Button onClick={openQuote}>Request a quotation</Button></div><div className="contact-details"><a href="https://maps.google.com/?q=Al+Moosa+Tower+2+Sheikh+Zayed+Road+Dubai" target="_blank" rel="noreferrer"><span><Icon name="pin"/></span><div><small>Address</small><strong>Al Moosa Tower 2, Office 202<br/>Sheikh Zayed Road, Dubai, UAE</strong></div></a><a href="tel:+97145826077"><span><Icon name="phone"/></span><div><small>Phone</small><strong>+971 4 582 6077</strong></div></a><a href="mailto:info@fsflow360.com"><span><Icon name="mail"/></span><div><small>General enquiries</small><strong>info@fsflow360.com</strong></div></a></div></div>
        <footer><Wordmark compact/><p>© {new Date().getFullYear()} FS Flow Project Management. Dubai, UAE.</p><a href="https://www.fsflow360.com" target="_blank" rel="noreferrer">www.fsflow360.com</a></footer>
      </section>

      {selectedProject && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><Icon name="close"/></button><img src={selectedProject.image} alt=""/><div><p>{selectedProject.category}</p><h2 id="project-title">{selectedProject.title}</h2><span>{selectedProject.scope}</span><p className="modal-text">A selected project from the FS Flow portfolio. Contact the team to discuss a similar brief, timeline and production requirements.</p><Button onClick={() => { setSelectedProject(null); openQuote(); }}>Start a similar project</Button></div></section></div>}

      {quoteOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setQuoteOpen(false)}><section className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close quotation form"><Icon name="close"/></button>{sent ? <div className="thanks"><span><Icon name="spark" size={30}/></span><h2>Thank you.<br/><i>We’ll be in touch.</i></h2><p>Your project enquiry is ready for the FS Flow team. We will respond using the contact details provided.</p><button className="text-button" onClick={() => setQuoteOpen(false)}>Close</button></div> : <><div className="section-label"><span>Project enquiry</span></div><h2 id="quote-title">Let’s make it<br/><i>happen.</i></h2><p>Share a few details and the FS Flow team will prepare the right next step.</p><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="field-row"><label>Full name<input required name="name" placeholder="Your name"/></label><label>Company<input name="company" placeholder="Company name"/></label></div><div className="field-row"><label>Email address<input required type="email" name="email" placeholder="you@company.com"/></label><label>Phone / WhatsApp<input name="phone" placeholder="+971"/></label></div><label>Service required<select defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.name}>{service.name}</option>)}</select></label><label>Tell us about the project<textarea name="details" placeholder="Date, venue, audience and project objectives" rows="3"/></label><button className="form-submit" type="submit">Send project enquiry <Icon name="arrow" size={17}/></button></form><small className="form-note">Demo form interface—connect this to the chosen enquiry inbox or CRM before going live.</small></>}</section></div>}
    </main>
  );
}

export default App;
