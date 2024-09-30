import React, { useRef } from 'react';
import styles from './TermsOfService.module.css';

const Cookies: React.FC = () => {
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  const sections = {
    introduction: {
      title: '1. Introduction',
      content: `
        <p>This Cookie Policy applies to any CMJ product or service that links to this policy or incorporates it by reference. We may use cookies and similar technologies such as pixels, local storage and mobile ad IDs (collectively referred to in this policy as "cookies") to collect and use data as part of our Services, as defined in our Privacy Policy ("Services") and which includes our sites, communications, mobile applications and off-site Services, In the spirit of transparency, this policy provides detailed information about how and when we use these technologies.</p>
        <p>By continuing to visit or use our Services, you are agreeing to the use of cookies and similar technologies for the purposes described in this policy.</p>
      `
    },
    technologies: {
      title: '2. What technologies may be used?',
      content: `
        <p>Our cookie tables lists cookies and similar technologies that may be used as part of our Services. Please note that the names of cookies and similar technologies may change over time.</p>
        <table>
          <tr><th>Type of Technology</th><th>Description</th></tr>
          <tr>
            <td>Cookies</td>
            <td>A cookie is a small file placed onto your device that enables CMJ features and functionality. Any browser visiting our sites may receive cookies from us or cookies from third parties such as our customers, partners or service providers. We use two types of cookies: persistent cookies and session cookies. A persistent cookie lasts beyond the current session and is used for many purposes, such as recognizing you as an existing user, so it's easier to return to CMJ and interact with our Services without signing in again. Since a persistent cookie stays in your browser, it will be read by CMJ when you return to one of our sites or visit a third party site that uses our Services. Session cookies last only as long as the session (usually the current visit to a website or a browser session).</td>
          </tr>
          <tr>
            <td>Pixels</td>
            <td>A pixel is a tiny image that may be embedded within web pages and emails, requiring a call (which provides device and visit information) to our servers in order for the pixel to be rendered in those web pages and emails. We use pixels to learn more about your interactions with email content or web content, such as whether you interacted with ads or posts. Pixels can also enable us and third parties to place cookies on your browser.</td>
          </tr>
          <tr>
            <td>Local Storage</td>
            <td>Local storage enables a website or application to store information locally on your device(s). Local storage may be used to improve the CMJ experience, for example, by enabling features, remembering your preferences and speeding up site functionality.</td>
          </tr>
          <tr>
            <td>Similar Technologies</td>
            <td>We may also use other tracking technologies, such as mobile advertising IDs and tags for similar purposes as described in this Cookie Policy. References to similar technologies in this policy includes pixels, local storage, and other tracking technologies.</td>
          </tr>
        </table>
      `
    },
    purposes: {
      title: '3. What are These Technologies Used for?',
      content: `
        <table>
          <tr><th>Purpose</th><th>Description</th></tr>
          <tr>
            <td>Authentication</td>
            <td>We use cookies and similar technologies to recognize you when you visit our Services. If you're signed into CMJ, these technologies help us show you the right information and personalize your experience in line with your settings. For example, cookies enable CMJ to identify you and verify your account.</td>
          </tr>
          <tr>
            <td>Security</td>
            <td>We use cookies and similar technologies to make your interactions with our Services faster and more secure. For example, we use cookies to enable and support our security features, keep your account safe and to help us detect malicious activity and violations of our Terms of Use.</td>
          </tr>
          <tr>
            <td>Preferences, features and services</td>
            <td>We use cookies and similar technologies to enable the functionality of our Services, such as helping you to fill out forms on our Services more easily and providing you with features, insights and customized content in conjunction with our plugins. We also use these technologies to remember information about your browser and your preferences. For example, cookies can tell us which language you prefer and what your communications preferences are. We may also use local storage to speed up site functionality.</td>
          </tr>
          <tr>
            <td>Customized content</td>
            <td>We use cookies and similar technologies to customize your experience on our Services. For example, we may use cookies to remember previous searches so that when you return to our services, we can offer additional information that relates to your previous search.</td>
          </tr>
          <tr>
            <td>Advertising</td>
            <td>Cookies and similar technologies help us show relevant advertising to you more effectively, both on and off our Services and to measure the performance of such ads. We use these technologies to learn whether content has been shown to you or whether someone who was presented with an ad later came back and took an action (e.g., downloaded a white paper or made a purchase) on another site. Similarly, our partners or service providers may use these technologies to determine whether we've shown an ad or a post and how it performed or provide us with information about how you interact with ads. We may also work with our customers and partners to show you an ad on or off CMJ, such as after you've visited a customer's or partner's site or application. These technologies help us provide aggregated information to our customers and partners. For further information regarding the use of cookies for advertising purposes, please see our Privacy Policy.</td>
          </tr>
          <tr>
            <td>Analytics and research</td>
            <td>Cookies and similar technologies help us learn more about how well our Services and plugins perform in different locations. We or our service providers use these technologies to understand, improve, and research products, features and services, including as you navigate through our sites or when you access CMJ from other sites, applications or devices. We or our service providers, use these technologies to determine and measure the performance of ads or posts on and off CMJ and to learn whether you have interacted with our websites, content or emails and provide analytics based on those interactions. We also use these technologies to provide aggregated information to our customers and partners as part of our Services. If you are a member but logged out of your account on a browser, CMJ may still continue to log your interaction with our Services on that browser until the expiration of the cookie in order to generate usage analytics for our Services. We may share these analytics in aggregate form with our customers.</td>
          </tr>
        </table>
      `
    },
    thirdParties: {
      title: '4. What third parties use these technologies in connection with our Services?',
      content: `
        <p>Third parties such as our customers, partners and service providers may use cookies in connection with our Services.</p>
        <p>For example, third parties may use cookies in their CMJ pages, job posts and their advertisements on and off CMJ for their own marketing purposes.</p>
        <p>Third parties may also use cookies in connection with our off-site Services. Third parties may use cookies to help us to provide our Services. We may also work with third parties for our own marketing purposes and to enable us to analyze and research our Services.</p>
      `
    },
    yourChoices: {
      title: '5. Your Choices',
      content: `
        <p>You have choices on how CMJ uses cookies and similar technologies. Please note that if you limit the ability of CMJ to set cookies and similar technologies, you may worsen your overall user experience, since it may no longer be personalized to you. It may also stop you from saving customized settings like login information.</p>
      `
    },
    strictlyNecessaryCookies: {
      title: '6. Strictly Necessary Cookies',
      content: `
        <p>These cookies are set by CMJ or a third party on our behalf, and are essential to enable you to use the features of our Services. Without these cookies, our Services cannot be provided so you cannot decline them.</p>
      `
    },
    optOutOfTargetedAdvertising: {
      title: '7. Opt out of targeted advertising',
      content: `
        <p>As described in Privacy Policy, you may have choices regarding (if available) the personalized ads you may see.</p>
        <p>Some mobile device operating systems such as Android provide the ability to control the use of mobile advertising IDs for ads personalization. You can learn how to use these controls by visiting the manufacturer's website.</p>
      `
    },
    browserControls: {
      title: '8. Browser Controls',
      content: `
        <p>Most browsers allow you to control cookies through their settings, which may be adapted to reflect your consent to the use of cookies. Further, most browsers also enable you to review and erase cookies, including CMJ cookies. To learn more about browser controls, please consult the documentation that your browser manufacturer provides.</p>
      `
    },
    updatesToPolicy: {
      title: '9. Updates to this Policy',
      content: `
        <p>We may occasionally make changes to this Policy.</p>
        <p>When we make material changes to this Policy, we'll provide you with prominent notice as appropriate under the circumstances. For example, we may display a prominent notice within the Services or send you an email or device notification.</p>
      `
    }
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
          <h2>Cookie Policy</h2>
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

export default Cookies;