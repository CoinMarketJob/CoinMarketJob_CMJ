import React, { useRef } from 'react';
import styles from './TermsOfService.module.css';

const PrivacyPolicy: React.FC = () => {
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  const sections = {
    introduction: {
      title: '1. Introduction',
      content: `
        <h3>1.1. General</h3>
        <p>We are a social network and online platform for professionals. People use our Services to find and be found for business opportunities, to connect with others and find information. Our Privacy Policy applies to any Member or Visitor to our Services.</p>
        <p>Our registered users ("Members") share their professional identities, engage with their network, exchange knowledge and professional insights, post and view relevant content, learn and develop skills, and find business and career opportunities. Content and data on some of our Services is viewable to non-Members ("Visitors")</p>

        <h3>1.2. Services</h3>
        <p>This Privacy Policy, including our Cookie Policy applies to your use of our Services.</p>
        <p>This Privacy Policy applies to coinmarketjob.com, coinmarketjob-branded apps, and other coinmarketjob-branded sites, apps, communications and services offered by coinmarketjob ("CMJ") ("Services"), including off-site Services. For California residents, additional disclosures required by California law may be found in our California Privacy Disclosure.</p>

        <h3>1.3. Data Controllers and Contracting Parties</h3>
        <p>CMJ will be the controller of (or business responsible for) your personal data provided to, or collected by or for, or processed in connection with our Services.</p>
        <p>As a Visitor or Member of our Services, the collection, use and sharing of your personal data is subject to this Privacy Policy and other documents referenced in this Privacy Policy, as well as updates.</p>

        <h3>1.4. Change</h3>
        <p>Changes to the Privacy Policy apply to your use of our Services after the "effective date."</p>
        <p>CMJ ("we" or "us") can modify this Privacy Policy, and if we make material changes to it, we will provide notice through our Services, or by other means, to provide you the opportunity to review the changes before they become effective. If you object to any changes, you may close your account.</p>
        <p>You acknowledge that your continued use of our Services after we publish or send a notice about our changes to this Privacy Policy means that the collection, use and sharing of your personal data is subject to the updated Privacy Policy, as of its effective date.</p>
      `,
    },
    dataWeCollect: {
      title: '2. Data We Collect',
      content: `
        <h3>2.1. Data You Provide To Us</h3>
        <p>To create an account you need to provide data including your name, email address and/or mobile number, general location (e.g., city), and a password. If you register for a premium Service, you will need to provide payment (e.g., credit card) and billing information.</p>
        <p>You have choices about the information on your profile, such as your education, work experience, skills, photo, city or area, endorsements, and optional verifications of information on your profile (such as verifications of your identity or workplace). You don't have to provide additional information on your profile; however, profile information helps you to get more from our Services, including helping recruiters and business opportunities find you. It's your choice whether to include sensitive information on your profile and to make that sensitive information public. Please do not post or add personal data to your profile that you would not want to be publicly available.</p>
        <p>We collect personal data from you when you provide, post or upload it to our Services, such as when you fill out a form, (e.g., with demographic data or salary), respond to a survey, or submit a resume or fill out a job application on our Services.</p>
        <p>You don't have to post or upload personal data; though if you don't, it may limit your ability to grow and engage with your network over our Services.</p>

        <h3>2.2. Data From Others</h3>
        <h4>Content and News</h4>
        <p>Others may post or write about you. You and others may post content that includes information about you (as part of articles, posts, comments, videos) on our Services. We also may collect public information about you, such as professional-related news and accomplishments, and make it available as part of our Services, including, as permitted by your settings, in notifications to others of mentions in the news.</p>
        <h4>Contact</h4>
        <p>We receive personal data (including contact information) about you when others associate their contacts with Member profiles, scan and upload business cards, or send messages using our Services (including invites or connection requests). If you or others opt-in to sync email accounts with our Services, we will also collect "email header" information that we can associate with Member profiles.</p>
        <h4>Partners</h4>
        <p>We receive personal data (e.g., your job title and work email address) about you when you use the services of our customers and partners, such as employers or prospective employers and applicant tracking systems providing us job application data.</p>
        <h4>Related Companies and Other Services</h4>
        <p>We receive data about you when you use some of the other services provided by us or our Affiliates.</p>

        <h3>2.3. Service Use</h3>
        <p>We log your visits and use of our Services, including mobile apps. We log usage data when you visit or otherwise use our Services, including our sites, app and platform technology, such as when you view or click on content (e.g., learning video) or ads (on or off our sites and apps), perform a search, install or update one of our mobile apps, share articles or apply for jobs. We use log-ins, cookies, device information and internet protocol ("IP") addresses to identify you and log your use.</p>

        <h3>2.4. Cookies and Similar Technologies</h3>
        <p>We collect data through cookies and similar technologies. As further described in our Cookie Policy, we may use cookies and similar technologies (e.g., pixels and ad tags) to collect data (e.g., device IDs) to recognize you and your device(s) on, off and across different services and devices where you have engaged with our Services. We may also allow some others to use cookies as described in our Cookie Policy. You can opt out from our use of data from cookies and similar technologies that track your behaviour on the sites of others for ad targeting and other ad-related purposes.</p>

        <h3>2.5. Your Device and Location</h3>
        <p>When you visit or leave our Services (including some plugins and our cookies or similar technology on the sites of others), we receive the URL of both the site you came from and the one you go to and the time of your visit. We also get information about your network and device (e.g., IP address, proxy server, operating system, web browser and add-ons, device identifier and features, cookie IDs and/or ISP, or your mobile carrier). If you use our Services from a mobile device, that device will send us data about your location based on your phone settings. We will ask you to opt-in before we use GPS or other tools to identify your precise location.</p>

        <h3>2.6. Communications</h3>
        <p>We collect information about you when you communicate with others through our Services (e.g., when you send, receive, or engage with messages, events, or connection requests, including our marketing communications). This may include information that indicates who you are communicating with and when. We also use automated systems to support and protect our site. For example, we use such systems to suggest possible responses to messages and to manage or block content that violates our User Agreement or company policies.</p>

        <h3>2.7. Workplace and School Provided Information</h3>
        <p>Others buying our Services for your use, such as your employer or your school, provide us with personal data about you and your eligibility to use the Services that they purchase for use by their workers, students or alumni. For example, we will get contact information for "Profile Page" administrators and for authorizing users of our premium Services, such as our recruiting, sales or learning products.</p>

        <h3>2.8. Other</h3>
        <p>We are improving our Services, which means we get new data and create new ways to use data. Our Services are dynamic, and we often introduce new features, which may require the collection of new information. If we collect materially different personal data or materially change how we collect, use or share your data, we will notify you and may also modify this Privacy Policy.</p>
      `,
    },
    legalBases: {
      title: '3. Legal Bases for Processing your Personal Data',
      content: `
        <p>CMJ only processes your personal data when we have a legal basis. We set out in this section each of the legal bases we rely on, why and how we use your data, and the categories of personal data we process.</p>

        <h3>3.1. To perform our contract with you</h3>
        <p>CMJ processes personal data when it is necessary to perform our contract (the Terms of Use) with our Members. Where we need your personal data to perform a contract with you and you do not provide the data, we will not be able to enter into the contract, or we may have to suspend or cancel any existing contract we have with you.</p>

        <table>
          <tr>
            <th>Why and how we use your data</th>
            <th>Data we use</th>
          </tr>
          <tr>
            <td>To allow Members to register for and manage access to their CMJ account, to view the CMJ platform in their preferred language, and to receive the core Services under our Terms of Use.</td>
            <td>Your account information: your name, email address, login and two-step verification information, payment information (for paid Services), subscription information, and Member-chosen language.<br><br>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies.</td>
          </tr>
        </table>

        <h3>3.2. Consent</h3>
        <p>CMJ processes personal data when Members give us consent, such as via their settings, by agreeing to our terms, and through in-product experiences. Where we rely on consent, you can withdraw your consent at any time by using your settings or by contacting us, however this will not affect our use of your data up to that point.</p>

        <table>
          <tr>
            <th>Why and how we use your data</th>
            <th>Data we use</th>
          </tr>
          <tr>
            <td>So Members can add information to their profiles and display it to their connections, network and Visitors on CMJ, and display it off CMJ on their publicly-visible profile and in the applications of affiliates, partners, customers and developers.</td>
            <td>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details</td>
          </tr>
          <tr>
            <td>To enable two-factor authentication for Members to protect their accounts or recover access to their accounts.</td>
            <td>Two-factor verification information (e.g., phone number)</td>
          </tr>
          <tr>
            <td>To allow Members to make and accept new connections.</td>
            <td>Connect functionality on Member profiles<br>Contact information (email, telephone, etc.)</td>
          </tr>
          <tr>
            <td>So Members can show their profile alongside information about their company or institution, or their stated interests on CMJ.</td>
            <td>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details</td>
          </tr>
          <tr>
            <td>So that Members can verify certain information about themselves, to include a verification and related information on their profile and elsewhere where their profile information appears, and, depending on the verification method, to receive and store verification data, and to use it for security purposes.</td>
            <td>Verification data (work or educational institution email address, profile verification badge and information, Member ID, hashed unique identifier, country of issuance for government IDs used to obtain verification badge via our verification partner)<br>Name</td>
          </tr>
          <tr>
            <td>So Members can interact with our platform functionality, features and tools, such as certain tools and solutions that leverage AI.</td>
            <td>Member inputted information (e.g., learning goals, topics of interest, uploaded CVs)<br>Publicly-viewable information on Members<br>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details</td>
          </tr>
          <tr>
            <td>For CMJ or third parties to send Members marketing communications (e.g., emails or SMS messages) in order to market products, services and events.</td>
            <td>Contact details (e.g., email address, phone number), location and current position<br>Other data submitted through forms (e.g. name, company, answers to custom questions)</td>
          </tr>
          <tr>
            <td>To enable Members to discover, signal interest in and apply for jobs and opportunities on our Services; and to enable Members to be discovered by hirers for job and opportunities.</td>
            <td>Location<br>Job search filters (e.g. industry, experience level, job type, remote status, salary, benefits etc.)<br>Job preferences (as set by Members)<br>Uploaded CVs<br>Member profile information submitted by Members as part of a job application<br>Job account information</td>
          </tr>
          <tr>
            <td>For CMJ to use non-essential cookies and similar tracking technologies to identify Members, to deliver ads, and to conduct analytics related to user interaction with CMJ pages and ads.</td>
            <td>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and similar technologies</td>
          </tr>
          <tr>
            <td>To perform analytics to provide aggregated workforce and salary insights to Members, customers and others based on Member-provided data.</td>
            <td>Member provided demographic data (e.g. disability and gender)</td>
          </tr>
          <tr>
            <td>For CMJ and its customers to use data we receive from third parties to display personalized advertisements to Members and Visitors.</td>
            <td>Data collected when Members and Visitors visit third party websites; IP address and browser ID<br>Information from advertising partners, vendors and publishers.</td>
          </tr>
        </table>

        <h3>3.3. Legitimate Interest</h3>
        <p>In some cases, the collection and processing of your personal data is based on our legitimate interests and/or the legitimate interests of third parties (e.g., CMJ customers and our Members), provided that our interest in processing does not outweigh your interests or fundamental rights and freedoms. These interests include commercial interests, the interests of our Members and broader societal benefits. In each instance, we have considered whether these interests are outweighed by your rights and freedoms, and have concluded, based on the limited impact of the processing, the strong safeguards we apply, and the controls we offer you over your data, that we can proceed with the processing.</p>

        <table>
          <tr>
            <th>How we use your data</th>
            <th>Legitimate interests relied on</th>
            <th>Personal data used</th>
          </tr>
          <tr>
            <td>To help protect you, us, or others from threats, we log users' activity on CMJ to identify and investigate harmful or fraudulent behaviour that violates our Terms of User. Examples of the behaviour include: security threats, hacks, scraping, fake accounts and information, bots, malicious actors, or fraud.<br>To verify certain information you have provided e.g. your workplace, educational institution or your identity.<br>To share data with our affiliates, for security purposes, to prevent, detect investigate and address possible fraud or harmful behaviour or other violations of the law or our Terms of Use, attempts to harm our Members, Visitors, our affiliates or others, and to protect the security and integrity of our platform.<br>To share data with other organisations for security purposes to prevent, detect, investigate and address threats, harmful behaviour, possible fraud or other violations of the law.<br>To use automated systems such as generative AI to detect and prevent harmful content on your feed and in messages, and train and improve our AI systems for these trust and security-related purposes.<br>To verify your account following account restriction or closure for breaches of our Terms of Use.</td>
            <td>Safety and Security:<br>To improve the safety, security, authenticity of our Services.<br>To better protect the personal data of our Members and Visitors.<br>To detect, investigate and address threats, bad actors and malicious activity on our Services.<br>So that our affiliates, can detect, investigate and address threats, possible fraud, bad actors, harmful behaviour and malicious activity against CMJ, our affiliates, and others.<br>So that CMJ and other organisations can detect, investigate and address threats, possible fraud, bad actors and malicious activity online.</td>
            <td>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from cookies and other similar technologies<br>Your account information: your email address, login and two-step verification information, payment and subscription information<br>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services<br>Data that you provide when you contact us or request support via email, our ticket system or live chat. This may include your name, email address, account details, phone number, payment information and the details of your query or issue<br>Your connections and group memberships<br>Reports from you, or reports that others make about you relating to possible violations of Terms of Use or CMJ policies<br>Your verification badge and verification information when you have verified certain information on the platform<br>Where permitted, government ID and other personal identification documentation for account recovery purposes</td>
          </tr>
          <tr>
            <td>To enable or administer our business, such as for quality control, preparing consolidated reports on our business, and customer service.<br>To manage corporate transactions, such as mergers, acquisitions or sales.<br>To monitor the use of our Member and customer service offerings and perform analytics to produce reports on the effectiveness of our Member and customer support services.<br>To perform analytics to produce reports and metrics on how our Services are used to help evaluate product performance, fix issues, improve and deliver our Services.<br>To understand and improve our business or customer relationships generally.<br>To make business and financial projections.<br>To transfer Member and Customer data to be processed and stored on data centres in  or outside of the related country.<br>To create reports and metrics based on your use of our products, such as interactions with ads, to enable us to invoice our customers for our products and services, and to understand usage of our Services.</td>
            <td>Business Administration:<br>To run our business efficiently and effectively.<br>To comply with laws regarding business operations, consumer protection and tax compliance.<br>To fulfil the expectations of our Members, Visitors, and customers about the high quality of our Services.<br>To enhance, grow, strengthen and otherwise manage our business and assets.<br>To meet the needs of our Visitors, Members and Customers, and better ensure that our Members, customers and Visitors receive quality services from CMJ.</td>
            <td>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies<br>Your account information including payment and subscription information<br>Data that you provide when you contact us or request support via email, our ticket system or live chat. This may include your name, email address, account details, phone number, payment information and the details of your query or issue<br>Information received by post at any of our CMJ offices worldwide<br>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services<br>Your connections and group memberships<br>Inferences we make about you<br>Personal demographic data<br>Reports from you, or reports that others make about you relating to possible violations of Terms of Use or CMJ policies<br>Data about your use of some of the other services provided by us or our affiliates</td>
          </tr>
          <tr>
            <td>To perform analytics, CMJ uses information you've provided, and information inferred from you and your network to personalise content and recommendations. CMJ may use profiling techniques to achieve these purposes. These include seeing posts and people that we think might interest you on your feed.<br>To make suggestions for how you can expand your network by recommending connections, groups and topics you may like to follow or contribute to.<br>To recommend jobs.<br>To display personalised ads, as described in more detail below.<br>To provide personalised features to customers in CMJ paid services<br>Allowing CMJ customers to search for and contact Members that may be interested in purchasing products or services<br>To allow CMJ customers to search for job candidates who match their job criteria and contact Members directly about job opportunities.</td>
            <td>Personalising your CMJ experience:<br>To fulfil our mission to connect the world's professionals to make them more productive and successful.<br>To create economic opportunity for our Members, customers and Visitors.<br>To enable our Members and Visitors to make real world connections with each other, find jobs and economic opportunity, express opinions, exchange information, and conduct business.<br>To meet CMJ's customers' interests in ensuring they can advertise jobs, products or services to Members who may be interested in them.<br>To provide Members with access to business development opportunities derived from B2B marketing.<br>To connect Members with jobs and opportunities to match their skills, experience and career aspirations.</td>
            <td>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies<br>Data that you or others provide in your profile:your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services<br>Your connections and group memberships<br>Inferences we make about you<br>Personal demographic data</td>
          </tr>
          <tr>
            <td>To disclose information about you when required by law, subpoena, or other legal process or if we have a good faith belief that disclosure is reasonably necessary for any of the following reasons:<br>- To investigate, prevent or take action regarding suspected or actual illegal activities or to assist government enforcement agencies;<br>- To enforce our agreements with you and our customers;<br>- To investigate and defend ourselves against any claims and allegations, including third-party claims;<br>- To protect the security or integrity of our Services (such as by sharing with companies facing similar threats);<br>- To exercise or protect the rights and safety of CMJ, our Members, personnel or others.</td>
            <td>Law enforcement and legal requests:<br>To advance the legitimate interests of CMJ and our wider community (including Members, Visitors and customers) to comply with the law.<br>To avoid sanctions for non-compliance.<br>To better protect against illegal or harmful activity in connection with our Services.</td>
            <td>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies<br>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services<br>Your connections and group memberships<br>Your communications with CMJ, including information received by post at any of our CMJ offices worldwide</td>
          </tr>
          <tr>
            <td>We retain and share information with our lawyers and relevant experts when we seek legal advice or are involved in litigation. regulatory inquiries or disputes.</td>
            <td>Legal advice and litigation:<br>CMJ's interest to protect CMJ and its Affiliates, their brands, employees and business interests from legal challenges, regulatory investigations or criminal activity.<br>To better protect the interests of our Members, Visitors and customers by identifying and addressing illegal, unfair or harmful activity.</td>
            <td>Any data relating to you that is relevant to the legal advice, possible litigation or ongoing litigation. This will depend on the nature of the legal issue and could involve any information related to your use of CMJ's products and the Services</td>
          </tr>
          <tr>
            <td>To review our products, conduct research and introduce new product features that help us better serve our Members and customers.<br>To generate metrics to understand how our Services are used, to inform and improve product direction and development. For example, we may measure how many users visit a certain page, how long they stay, or what actions they take on that page.<br>To undertake testing to evaluate the impact of new features.<br>To invite you to take surveys or provide feedback and analyse your responses to gain insights into users' views, preferences, needs, or experiences with our Services and to identify corrections and/or improvements for our products.<br>To produce aggregate insights to deliver data to Members, advertisers, and others relating to global workforce trends, to measure and improve equality of e.g. job opportunities.<br>To provide access to third party researchers who may conduct research regarding online safety and other areas where CMJ is required to allow access to certain data.<br>To identify and report aggregated trends like talent migration, hiring rates, and in-demand skills by region.</td>
            <td>Research development and addressing errors:<br>To help us connect people to economic opportunity in new ways and by partnering with governments and organisations around the world.<br>To fulfil our mission to connect the world's professionals to make them more productive and successful.<br>To create economic opportunity for our Members and Visitors.<br>To understand how people use our Services and what new features they like, so we can improve existing features and create more useful products in the future.<br>In furtherance of our legal and other obligations to provide safe, secure, fair and legal service.</td>
            <td>Personal demographic data<br>Your connections and group memberships<br>Inferences we make about you<br>Data that you or others provide in your profile:nyour name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services<br>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies</td>
          </tr>
          <tr>
            <td>To display certain ads that are relevant to your interests and preferences, based on the data we collect from our Services.<br>To show you ads while you visit websites or apps.</td>
            <td>To display personalised ads:<br>To provide you with more personalized relevant ads, and to help our customers reach the right audience for their products and services.<br>To further our efforts to provide you with ads that are more likely to contain content you are interested in, which advances our legitimate interests and those of our Members in providing a revenue source that better enables us to offer many Services free of charge to our Members.<br>To meet our customers' interests in advertising jobs, products or services to Members that are likely to be interested in them.</td>
            <td>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services including: search history, feed, content you read, who you follow or is following you, connections, participation, page visits, videos you watch<br>Your connections and group memberships<br>Inferences we make about you including about your location, age and gender<br>Personal demographic data<br>Actions by Members with similar profiles to yours<br>Third party requests to show ads to Members<br>Information from advertising partners, vendors and publishers <br>Data relating to your use of our services, such as IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies</td>
          </tr>
          <tr>
            <td>To measure and optimise ad delivery and engagement so that we can create aggregated reports (that don't identify you) for our Customers on the performance and effectiveness of their ads and other informational and promotional activities on our services, and the characteristics of the audiences they reach.<br>To create aggregated reports for our Customers on how Members interact with their ads on and off CMJ and their informational and promotional activities on our services.<br>To create aggregated statistics about Members, their professions or industry, and to publish Visitor demographics for our Services.<br>Although the aggregated reports we provide to our customers do not identify you, customers can use these reports to inform their overall advertising strategies.</td>
            <td>To perform and provide analytics and insights:<br>To help our customers measure the impact and relevance of their ads.<br>To support customers' interests in understanding the categories of professionals that engage with their content without identifying individual Members. In turn, this helps customers to adapt their content to make them more suitable for the types of professionals they are interested in connecting with.</td>
            <td>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies<br>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services including: search history, feed, content you read, who you follow or is following you, connections, page visits, videos you watch<br>Your connections and group memberships<br>Personal demographic data<br>Data about actions you took in response to ads (visits to websites, ads you have clicked on or product purchases)</td>
          </tr>
          <tr>
            <td>Members or customers may provide personal data as an input to an AI or generative AI feature ("AI-powered feature"), which could result in personal data being included within output.<br>Automatically processing your data (including your profile data and posts) as an input for an AI-powered feature (e.g. providing more relevant responses to your queries or in connection with your inputs to a generative AI feature).<br>To train and improve our AI systems for purposes other than content creation (e.g., for security, trust, and content classification purposes).<br>Using Members' feedback to improve, correct or modify our products, including for AI-powered features.<br>Using automated techniques, including generative AI-powered tools as part of our online safety and security efforts.</td>
            <td>AI features:<br>To enable economic opportunity and help our Members and customers be more productive and successful.<br>To enhance the safety and security of our platform.<br>To improve the efficiency and effectiveness of providing our Services.<br>To ensure that our products, features and Services are innovative, relevant and high quality.</td>
            <td>Personal data manually input into an AI powered feature by Members<br>Feedback you provide on AI features<br>Data that you or others provide in in a resume you provide or your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your connections and group memberships<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services</td>
          </tr>
          <tr>
            <td>Where permitted, sending marketing emails and other marketing communications about CMJ content, products or offers that we think will interest you. CMJ may use profiling techniques to achieve this purpose.<br>Promoting CMJ paid services and other products and features we think you'd like on and off CMJ.</td>
            <td>Direct Marketing<br>To enable economic opportunity and help our Members be more productive and successful.<br>To enhance and grow our business, meet the needs of our Visitors, Members and customers, and better ensure that our Members, customers and Visitors receive the quality services from CMJ.</td>
            <td>Data that you or others provide in your profile: your name, photo, current position, education, location, skills, endorsements, recommendations, and contact details<br>Your activity data including data that you or others provide in messages, posts, comments, articles, or other content on our Services<br>Your email address<br>Your connections and group memberships<br>Inferences we make about you<br>Personal demographic data<br>Data relating to your use of our Services: IP address, device ID, user agent, location data, browser type and version, operating system and platform, and other online identifiers collected from Cookies and other similar technologies</td>
          </tr>
        </table>

        <h3>3.4. Compliance with Legal Obligations and Public Interest</h3>
        <p>CMJ processes information to comply with a legal obligation, such as preserving or disclosing certain information to adhere to a valid legal request from law enforcement agencies, courts or regulators, or to comply with financial or consumer law obligations. New legal obligations may arise over time requiring the processing of Member and Visitor personal data. The data that we are required to process depends on e.g. the nature of the legal obligation or the legal request. CMJ will process personal data where is it is necessary to carry out a task in the public interest e.g. to protect children from harm.</p>
      `,
    },
    howWeShareInformation: {
      title: '4. How We Share Information',
      content: `
        <h3>4.1. Our Services</h3>
        <p>Any data that you include on your profile and any content you post or social action (e.g., likes, follows, comments, shares) you take on our Services will be seen by others, consistent with your settings.</p>
        
        <h4>Profile</h4>
        <p>Your profile is fully visible to all Members and customers of our Services. Subject to your settings, it can also be visible to others on or off of our Services (e.g., Visitors to our Services or users of third-party search tools). Your settings, degree of connection with the viewing Member, the subscriptions they may have, their usage of our Services, access channels and search types (e.g., by name or by keyword) impact the availability of your profile and whether they can view certain fields in your profile.</p>
        
        <h4>Posts, Likes, Follows, Comments, Messages</h4>
        <p>Our Services may allow viewing and sharing information including through posts, likes, follows and comments. When you share an article or a post (e.g., an update, image, video or article) publicly it can be viewed by everyone and re-shared anywhere. Members, Visitors and others will be able to find and see your publicly-shared content, including your name (and photo if you have provided one).</p>
        <p>In a group, posts are visible to others according to group type. For example, posts in private groups are visible to others in the group and posts in public groups are visible publicly. Your membership in groups is public and part of your profile, but you can change visibility in your settings.</p>
        <p>Any information you share through companies' or other organizations' pages on our Services will be viewable by those organizations and others who view those pages' content.</p>
        <p>When you follow a person or organization, you are visible to others and that "page owner" as a follower.</p>
        <p>We let senders know when you act on their message, subject to your settings where applicable.</p>
        <p>Subject to your settings, we let a Member know when you view their profile. We also give you choices about letting organizations know when you've viewed their Page.</p>
        <p>When you like or re-share or comment on another's content (including ads), others will be able to view these "social actions" and associate it with you (e.g., your name, profile and photo if you provided it).</p>
        <p>Your employer can see how you use Services they provided for your work (e.g. as a recruiter or sales agent) and related information. We will not show them your job searches or personal messages.</p>
        
        <h4>Enterprise Accounts</h4>
        <p>Your employer may offer you access to our enterprise Services. Your employer can review and manage your use of such enterprise Services.</p>
        <p>Depending on the enterprise Service, before you use such Service, we will ask for permission to share with your employer relevant data from your profile or use of our non-enterprise Services. We understand that certain activities such as job hunting and personal messages are sensitive, and so we do not share those with your employer unless you choose to share it with them through our Services.</p>
        <p>Subject to your settings, (if applicable) when you use workplace tools and services certain of your data may also be made available to your employer or be connected with information we receive from your employer to enable these tools and services.</p>

        <h3>4.2. Communication Archival</h3>
        <p>Regulated Members may need to store communications outside of our Service. Some Members (or their employers) need, for legal or professional compliance, to archive their communications and social media activity, and will use services of others to provide these archival services. We may enable archiving of messages by and to those Members outside of our Services.</p>

        <h3>4.3. Others' Services</h3>
        <p>Subject to your settings, other services may look up your profile. (if available) When you opt to link your account with other services, personal data (e.g., your name, title, and company) will become available to them. The sharing and use of that personal data will be described in, or linked to, a consent screen when you opt to link the accounts. Third-party services have their own privacy policies, and you may be giving them permission to use your data in ways we would not. You may revoke the link with such accounts.</p>
        <p>The information you make available to others in our Services (e.g., information from your profile, your posts, your engagement with the posts, or message to Pages) may be available to them on other services. For example, search tools, mail and calendar applications, or talent and lead managers may show a user limited profile data, and social media management tools or other platforms may display your posts. The information retained on these services may not reflect updates you make on our Services.</p>

        <h3>4.4. Related Services</h3>
        <p>We will share your personal data with our Affiliates to provide and develop our Services. We may also share your publicly-shared content (such as your public CMJ posts) with our affiliates, to provide or develop their services. Where allowed, we may combine information internally across the different Services covered by this Privacy Policy to help our Services be more relevant and useful to you and others. For example, we may personalize your feed or job recommendations based on your learning history.</p>

        <h3>4.5. Service Providers</h3>
        <p>We may also share your data with third-party service providers and processors. These include cloud service providers, content delivery networks, telecommunications providers, maintenance providers, Member support providers, development service providers, market researchers, anti-fraud and anti-abuse services providers, marketing and analytics providers, payment processors, external auditors and advisors, managed services providers, consultancy and professional services firms, such as legal and tax advisors. They will have access to your information (e.g., the contents of a customer support request) as reasonably necessary to perform these tasks on our behalf and are obligated not to disclose or use it for other purposes. If you purchase a Service from us, we may use a payments service provider who may separately collect information about you (e.g., for fraud prevention or to comply with legal obligations).</p>

        <h3>4.6. Legal Disclosures</h3>
        <p>We may need to share your data when we believe it's required by law or to help protect the rights and safety of you, us or others. It is possible that we will need to disclose information about you when required by law, subpoena, or other legal process or if we have a good faith belief that disclosure is reasonably necessary to (1) investigate, prevent or take action regarding suspected or actual illegal activities or to assist government enforcement agencies; (2) enforce our agreements with you; (3) investigate and defend ourselves against any third-party claims or allegations; (4) protect the security or integrity of our Services or the products or services of our affiliates (such as by sharing with companies facing similar threats); or (5) exercise or protect the rights and safety of CMJ, our Members, personnel or others. We attempt to notify Members about legal demands for their personal data when appropriate in our judgment, unless prohibited by law or court order or when the request is an emergency. We may dispute such demands when we believe, in our discretion, that the requests are overbroad, vague or lack proper authority, but we do not promise to challenge every demand.</p>

        <h3>4.7. Change in Control or Sale</h3>
        <p>We may share your data when our business is sold to others, but it must continue to be used in accordance with this Privacy Policy. We can also share your personal data as part of a sale, merger or change in control, or in preparation for any of these events. Any other entity which buys us or part of our business will have the right to continue to use your data, but only in the manner set out in this Privacy Policy unless you agree otherwise.</p>
      `,
    },
    yourChoicesAndObligations: {
      title: '5. Your Choices & Obligations',
      content: `
        <h3>5.1. Data Retention</h3>
        <p>We generally retain your personal data as long as you keep your account open or as needed to provide you Services. This includes data you or others provided to us and data generated or inferred from your use of our Services. Even if you only use our Services when looking for a new job every few years, we will retain your information and keep your profile open, unless you close your account. In some cases we choose to retain certain information (e.g., insights about Services use) in a depersonalized or aggregated form.</p>

        <h3>5.2. Rights to Access and Control Your Personal Data</h3>
        <p>We may provide many choices about the collection, use and sharing of your data, from deleting or correcting data you include in your profile and controlling the visibility of your posts to advertising opt-outs and communication controls. We may offer you settings to control and manage the personal data we have about you.</p>
        <p>For personal data that we have about you, you can:</p>
        <ul>
          <li><strong>Delete Data:</strong> You can ask us to erase or delete all or some of your personal data (e.g., if it is no longer necessary to provide Services to you).</li>
          <li><strong>Change or Correct Data:</strong> You can edit some of your personal data through your account. You can also ask us to change, update or fix your data in certain cases, particularly if it's inaccurate.</li>
          <li><strong>Object to, or Limit or Restrict, Use of Data:</strong> You can ask us to stop using all or some of your personal data (e.g., if we have no legal right to keep using it) or to limit our use of it (e.g., if your personal data is inaccurate or unlawfully held).</li>
          <li><strong>Right to Access and/or Take Your Data:</strong> You can ask us for a copy of your personal data and can ask for a copy of personal data you provided in machine readable form.</li>
          <li><strong>Portability:</strong> If we use your personal data to perform a contract with you, or with your consent, you have the right to receive your data and port it to another controller.</li>
        </ul>

        <h3>5.3. Account Closure</h3>
        <p>If you choose to close your account, your personal data will generally stop being visible to others on our Services within 24 hours. We generally delete closed account information within 30 days of account closure, except as noted below.</p>
        <p>We retain your personal data even after you have closed your account if reasonably necessary to comply with our legal obligations (including law enforcement requests), meet regulatory requirements, resolve disputes, maintain security, prevent fraud and abuse (e.g., if we have restricted your account for breach of our policies), enforce our Terms of Use, or fulfill your request to "unsubscribe" from further messages from us. We will retain de-personalized information after your account has been closed.</p>
        <p>Information you have shared with others (e.g., through messages, updates or group posts) will remain visible after you close your account or delete the information from your own profile or mailbox, and we do not control data that other Members have copied out of our Services. Groups content and ratings or review content associated with closed accounts will show an unknown user as the source. Your profile may continue to be displayed in the services of others (e.g., search tools) until they refresh their cache. Search engines like Bing, Google and Yahoo! may still display your information temporarily due to the way they collect and update their search data.</p>
      `,
    },
    otherImportantInformation: {
      title: '6. Other Important Information',
      content: `
        <h3>6.1. Security</h3>
        <p>We implement security safeguards designed to protect your data, such as HTTPS. We regularly monitor our systems for possible vulnerabilities and attacks. We put in place appropriate technical and organizational measures to help protect the security of your personal data. However, we cannot warrant the security of any information that you send us. There is no guarantee that data may not be accessed, disclosed, altered, or destroyed by breach of any of our physical, technical, or managerial safeguards.</p>
        <p>To protect your account, we encourage you to: (i) use a strong password which you only use for your CMJ account, (ii) never share your password with anyone, (iii) limit access to your computer and browser, and (iv) log out once you have finished using our Service on a shared device.</p>

        <h3>6.2. Cross-Border Data Transfers</h3>
        <p>CMJ shares personal data cross-border manner with CMJ affiliates, subcontractors and partners when carrying out the Services described in this Policy and Terms of Use. CMJ may store personal data in a country other than your home country. Your personal data may be processed in countries whose data protection laws are not considered to be as strong as EU laws or the laws which apply where you live. For example, they may not give you the same rights over your data.</p>
        <p>Whenever we transfer personal data internationally, we use tools to: make sure the data transfer complies with applicable law, help to give your data the same level of protection as it has in the EU.</p>
        <p>To ensure each data transfer complies with applicable EU legislation, we use the following legal mechanisms including transfers based on an adequacy decision by an approved authority, standard contractual clauses or, where appropriate, derogations permitted by law.</p>

        <h3>6.3. Lawful Bases for Processing</h3>
        <p>We will only collect and process personal data about you where we have lawful bases. Lawful bases include consent (where you have given consent), contract (where processing is necessary for the performance of a contract with you (e.g., to deliver our Services you have requested) and "legitimate interests." Where we rely on legitimate interests, you have the right to object. If you have any questions about the lawful bases upon which we collect and use your personal data, please contact us.</p>

        <h3>6.4. Withdrawing your Consent</h3>
        <p>Where we rely on your consent to process personal data, you have the right to withdraw or decline your consent at any time. When you withdraw your consent, this won't affect our use of your data up to that point.</p>

        <h3>6.5. Contact Information</h3>
        <p>If you have questions or complaints regarding this Policy, please first contact with us online. You can also reach us by physical mail.</p>
        <p>E-Mail Address: support@coinmarketjob.com</p>
        <p>Address for Physical Mail: Armaturvägen 3D, 136 50 Haninge
Stockholm / Sweden</p>
      `,
    },
  };

  Object.keys(sections).forEach((key) => {
    sectionRefs.current[key] = React.createRef<HTMLDivElement>();
  });

  const scrollToSection = (sectionKey: string) => {
    const element = sectionRefs.current[sectionKey]?.current;
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <>
      <div className={styles.navbar}></div>
      <div className={styles.container}>
        <div className={styles.menu}>
          <h2>Privacy Policy</h2>
          <ul>
            {Object.entries(sections).map(([key, section]) => (
              <li 
                key={key} 
                onClick={() => scrollToSection(key)}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} ref={sectionRefs.current[key]}>
              <h2 id={key}>{section.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;