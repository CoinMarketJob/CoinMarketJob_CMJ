import React, { useRef } from 'react';
import styles from './TermsOfService.module.css';

const TermsOfService: React.FC = () => {
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  const sections = {
    introduction: {
      title: 'Introduction',
      content: `
        <h3>1.1. Contract</h3>
        <p>By creating a CoinMarketJob ("CMJ") account or accessing or using our Services (described below), you are agreeing to enter into a legally binding contract with CMJ (even if you are using third party credentials or using our Services on behalf of a company). If you do not agree to this contract ("Contract" or "User Agreement"), do not create an account or access or otherwise use any of our Services. If you wish to terminate this Contract at any time, you can do so by closing your account and no longer accessing or using our Services.</p>
        <p>When you use our Services you agree to all of these terms. Your use of our Services is also subject to our Cookie Policy and our Privacy Policy, which covers how we collect, use, share, and store your personal information. Use of the Services may be subject to additional terms and conditions presented by CMJ, which are hereby incorporated by this reference into the terms of this Contract.</p>

        <h3>1.2. Services</h3>
        <p>This Contract applies to coinmarketjob.com, coinmarketjob-branded apps, and other coinmarketjob-related sites, apps, communications, and other services that state that they are offered under this Contract ("Services"), including the offsite collection of data for those Services.</p>
        <p>We provide numerous Services options. Certain Services options are provided free-of-charge, while other options require payment before they can be accessed (the "paid Services"). We may also offer special promotional plans, memberships, or services, including offerings of third-party products and services. We are not responsible for the products and services provided by such third parties.</p>
        <p>The Services may be integrated with, or may otherwise interact with, third-party applications, websites, and services ("Third-Party Applications") and third-party personal computers, mobile handsets, tablets, wearable devices, speakers, and other devices ("Devices"). Your use of such Third-Party Applications and Devices may be subject to additional terms, conditions and policies provided to you by the applicable third party. CMJ does not guarantee that Third-Party Applications and Devices will be compatible with the Services.</p>
        <p>Subject to your compliance with the terms of this Contract (including any other applicable terms and conditions), we grant to you limited, non-exclusive, revocable permission to use of the Services. Services shall remain in effect unless and until terminated by you or CMJ. You agree that you will not redistribute or transfer the Services.</p>
        <p>The CMJ software applications are licensed, not sold or transferred to you, and CMJ retains ownership of all copies of the CMJ software applications even after installation on your Devices.</p>

        <h3>1.3. CoinMarketJob</h3>
        <p>You are entering into this Contract with CoinMarketJob (also referred to as "we" and "us").</p>
        <p>You are entering into this Contract with CoinMarketJob and CoinMarketJob will be the controller of (or business responsible for) your personal data provided to, or collected by or for, or processed in connection with our Services.</p>
        <p>As a Visitor or Member of our Services, the collection, use, and sharing of your personal data is subject to our Privacy Policy, our Cookie Policy and other documents referenced in our Privacy Policy, and updates. You acknowledge and have read our Privacy Policy.</p>

        <h3>1.4. Members and Visitors</h3>
        <p>When you register and join the CoinMarketJob Services, you become a "Member". If you have chosen not to register for our Services, you may access certain features as a "Visitor." This Contract applies to Members and Visitors.</p>

        <h3>1.5. Changes</h3>
        <p>We may modify this Contract, our Privacy Policy and our Cookie Policy from time to time. If required by applicable law or we make material changes to this Contract, we will provide you notice through our Services, or by other means, to provide you the opportunity to review the changes before they become effective. We agree that changes cannot be retroactive. If you object to any of these changes, you may close your account. Your continued use of our Services after we publish or send a notice about our changes to these terms means that you are consenting to the updated terms as of their effective date.</p>

        <h3>1.6. Service Limitations and Modifications</h3>
        <p>We use reasonable care and skill to keep the Services operational. However, our service offerings and their availability may change from time to time and subject to applicable laws, without liability to you; for example:</p>
        <p>(i). The Services may experience temporary interruptions due to technical difficulties, maintenance or testing, or updates, including those required to reflect changes in relevant laws and regulatory requirements.</p>
        <p>(ii). We aim to evolve and improve our Services constantly, and we may modify, suspend, or stop (permanently or temporarily) providing all or part of the Services (including particular functions, features, subscription plans and promotional offerings).</p>
        <p>(iii). CMJ has no obligation to provide any specific content through the Services, and CMJ or the applicable owners may remove particular content without notice.</p>
        <p>CMJ has no liability to you, nor any obligation to provide a refund to you, in connection with internet or other service outages or failures that are caused by the actions of government authorities, other third parties or events beyond our control.</p>
      `
    },
    obligations: {
      title: 'Obligations',
      content: `
        <h3>2.1. Service Eligibility</h3>
        <p>In order to use or access our Services, you must (1) be 13 years of age (or the equivalent minimum age in your home country) or older; (2) have the permission of your parent or guardian if you are under the age of legal responsibility in your home country; (3) have the authority to enter into a binding contract with us and are not prevented from doing so under applicable law; (4) not already restricted by CMJ from using the Services and (5) reside in a country where the Services is available.</p>
        <p>You also promise that any registration information you submit to CMJ is true, accurate, and complete, and you agree to keep it that way at all times. Creating an account with false information is a violation of our terms, including accounts registered on behalf of others or persons under the minimum age. If law requires that you must be older in order for CMJ to lawfully provide the Services to you without parental consent (including using your personal data) then the minimum age is such older age. If you are under the age of legal responsibility in your home country, your parent or guardian must sign these Terms on your behalf. If you do not meet the minimum age requirements, CMJ cannot register you as a user.</p>

        <h3>2.2. Your Account</h3>
        <p>Members are account holders. You agree to: (1) protect against wrongful access to your account (e.g., use a strong password and keep it confidential); (2) not share or transfer your account or any part of it (e.g., sell or transfer the personal data of others by transferring your connections); and (3) follow the law, our list of Dos and Don'ts (below). You are responsible for anything that happens through your account unless you close it or report misuse. If your username or password is lost or stolen, or if you believe there has been an unauthorized access to your account, notify us immediately. CMJ may reclaim, or require you to change, your username for any reason.</p>
        <p>As between you and others (including your employer), your account belongs to you. However, if the Services were purchased by another party for you to use (e.g., Recruiter seat or courses offered by CMJ bought by your employer), the party paying for such Service has the right to control access to and get reports on your use of such paid Service; however, they do not have rights to your personal account.</p>

        <h3>2.3. Payment</h3>
        <p>If you buy any of our paid Services, you agree to pay us the applicable fees and taxes and you agree to the additional terms specific to the paid Services. Failure to pay these fees will result in the termination of your paid Services. Also, you agree that:</p>
        <p>(i). Your purchase may be subject to foreign exchange fees or differences in prices based on location (e.g., exchange rates).</p>
        <p>(ii). We may store and continue billing your payment method (e.g., credit card), even after it has expired, to avoid interruptions in your paid Services and to use it to pay for other Services you may buy. You may update or change your payment method.</p>
        <p>(iii). If you purchase a subscription, your payment method automatically will be charged at the start of each subscription period for the fees and taxes applicable to that period. To avoid future charges, cancel before the renewal date.</p>
        <p>(iv). We may modify our prices effective prospectively upon reasonable notice to the extent allowed under the law. Price changes will take effect at the start of the next subscription period following the date of the price change. Subject to applicable law, by continuing to use our Services after the price change takes effect, you will have accepted the new price. If you do not agree to a price change, you can reject the change by unsubscribing from the applicable paid Services prior to the price change going into effect.</p>
        <p>(v). All of your paid Services are subject to CMJ's refund policy.</p>
        <p>(vi). We may calculate taxes payable by you based on the billing information that you provide us.</p>

        <h3>2.4. Trials</h3>
        <p>From time to time, we or others on our behalf may offer trials of paid Services for a specified period without payment or at a reduced rate (a "Trial"). By using our Services via a Trial, you agree to the additional terms specific to the paid Services.</p>

        <h3>2.5. Renewal and Cancellation</h3>
        <p>Your payment to CMJ or the third party through which you purchased our paid Services will automatically renew at the end of the applicable subscription period, unless you cancel your paid Services before the end of the current subscription period. The cancellation will take effect the day after the last day of the current subscription period, and you will be downgraded to the free version of our Services. We do not provide refunds or credits for any partial subscription periods, except as expressly stated in these Contract.</p>

        <h3>2.6. Withdrawal Right</h3>
        <p>If you sign up for a Trial, you agree that the withdrawal right for the paid Services for which you are receiving a Trial ends fourteen (14) days after you start the Trial. If you don't cancel the paid Services before the Trial ends, you lose your right of withdrawal and authorise CMJ to automatically charge you the agreed price each month until you cancel the paid Services.</p>
        <p>If you purchase our paid Services with no Trial, you agree you have fourteen (14) days after your purchase to withdraw for any reason and must pay us for the services provided up until the time you tell us that you have changed your mind. You expressly consent to us providing you with the service immediately following your purchase, that you lose your right of withdrawal, and authorize CMJ to charge you automatically each month until you cancel.</p>

        <h3>2.7. Company Accounts</h3>
        <p>If you establish a CMJ account on behalf of a company, organization, or entity, (a "Company," and such account a "Company Account"), the terms "you" and "your," as used throughout these Contract (including other CMJ terms and conditions incorporated by reference herein), apply to both you and the Company.</p>
        <p>If you create a Company Account, you represent and warrant that you are authorized to grant all permissions and licenses provided in the Contract (including any other applicable CMJ terms and conditions) and to bind the Company to these terms.</p>

        <h3>2.8. Notices and Messages</h3>
        <p>You agree that we will provide notices and messages to you in the following ways: (1) within the Services or (2) sent to the contact information you provided us (e.g., email, mobile number, physical address). You agree to keep your contact information up to date.</p>

        <h3>2.9. Sharing</h3>
        <p>Our Services allow sharing of information (including content) in many ways, such as through your profile, posts, articles, group posts, links to news articles, job postings, and messages. Depending on the feature and choices you make, information that you share may be seen, copied, or used by other Members, Visitors, or others (on or off of the Services). Where we have made settings available, we will honor the choices you make about who can see content or other information (e.g., message content to your addressees, sharing content only to CMJ connections, restricting your profile visibility from search tools, or opting not to notify others of your CMJ profile update). For job searching activities, we default to not notifying your connections or the public. So, if you apply for a job through our Services or opt to signal that you are interested in a job, our default is to share it only with the job poster.</p>
        <p>To the extent that laws allow this, we are not obligated to publish any content or other information on our Services and can remove it with or without notice.</p>

        <h3>2.10. Member's Content</h3>
        <p>Members may post, upload, or otherwise contribute content to the Services ("User Content"). For the avoidance of doubt, "User Content" includes all information, materials and other content that is added, created, uploaded, submitted, distributed, or posted to the Services by users.</p>
        <p>You are solely responsible for all User Content that you post. You promise that, with respect to any User Content you post while using the Services, (1) you own or have the right to post such User Content; (2) such User Content, or its use by CMJ pursuant to the license granted below, does not: (i) violate the terms of this Contract, applicable law, or the intellectual property or other rights of any third party; or (ii) such User Content does not imply any affiliation with or endorsement of you or your User Content by CMJ or other individual or entity without the prior express written consent from CMJ or such individual or entity.</p>
        <p>In posting or sharing User Content or other information on the Services, please keep in mind that content and other information will be publicly accessible and may be used and re-shared by others on the Services and across the web, so please use caution in posting or sharing on the Services, and be mindful of your account settings. CMJ is not responsible for what you or others post or share on the Services.</p>
        <p>CMJ may, but has no obligation to, monitor or review User Content. CMJ reserves the right to remove or disable access to any User Content for any or no reason. CMJ may take these actions without prior notification to you.</p>
      `
    },
    rightsAndLimits: {
      title: 'Rights and Limits',
      content: `
        <h3>3.1. Your License to CMJ</h3>
        <p>As between you and CMJ, you own your original content that you submit or post to the Services.</p>
        <p>You grant CMJ and our affiliates the following non-exclusive license to the content and other information you provide (e.g., share, post, upload, and/or otherwise submit) to our Services:</p>
        <p>A worldwide, transferable and sublicensable right to use, copy, modify, distribute, publicly perform and display, host, and process your content and other information without any further consent, notice and/or compensation to you or others. These rights are limited in the following ways:</p>
        <p>(i). You can end this license for specific content by deleting such content from the Services, or generally by closing your account, except (a) to the extent you (1) shared it with others as part of the Services and they copied, re-shared it or stored it, (2) we had already sublicensed others prior to your content removal or closing of your account, or (3) we are required by law to retain or share it with others, and (b) for the reasonable time it takes to remove from backup and other systems.</p>
        <p>(ii). We will not include your content in advertisements for the products and services of third parties to others without your separate consent (including sponsored content). However, without compensation to you or others, ads may be served near your content and other information, and your social actions may be visible and included with ads, as noted in the Privacy Policy. If you use a Service feature, we may mention that with your name or photo to promote that feature within our Services, subject to your settings.</p>
        <p>(iii). We will honor the audience choices for shared content (e.g., "Connections only"). For example, if you choose to share your post to "Anyone on or off CMJ" (or similar): (a) we may make it available off CMJ; (b) we may enable others to publicly share onto third-party services (e.g., a Member embedding your post on a third party service); and/or (c) we may enable search tools to make that public content findable though their services.</p>
        <p>(iv). While we may edit and make format changes to your content (such as translating or transcribing it, modifying the size, layout or file type, and removing or adding labels or metadata), we will take steps to avoid materially modifying the meaning of your expression in content you share with others.</p>
        <p>(v). Because you own your original content and we only have non-exclusive rights to it, you may choose to make it available to others, including under the terms of a Creative Commons license.</p>
        <p>You and CMJ agree that we may access, store, process, and use any information (including content and/or personal data) that you provide in accordance with the terms of the Privacy Policy and your choices (including settings).</p>
        <p>By submitting suggestions or other feedback regarding our Services to CMJ, you agree that CMJ can use and share (but does not have to) such feedback for any purpose without compensation to you.</p>
        <p>You agree to only provide content and other information that does not violate the law or anyone's rights (including intellectual property rights). You have choices about how much information to provide on your profile but also agree that the profile information you provide will be truthful. CMJ may be required by law to remove certain content and other information in certain countries.</p>

        <h3>3.2. Service Availability</h3>
        <p>We may change, suspend or discontinue any of our Services. We may also limit the availability of features, content and other information so that they are not available to all Visitors or Members (e.g., by country or by subscription access).</p>
        <p>We don't promise to store or show (or keep showing) any information (including content) that you've shared. CMJ is not a storage service. You agree that we have no obligation to store, maintain or provide you a copy of any content or other information that you or others provide, except to the extent required by applicable law and as noted in our Privacy Policy.</p>

        <h3>3.3. Other Content, Sites and Apps</h3>
        <p>Others' Content: By using the Services, you may encounter content or other information that might be inaccurate, incomplete, delayed, misleading, illegal, offensive, or otherwise harmful. You agree that we are not responsible for content or other information made available through or within the Services by others, including Members. While we trying to review the content and other information presented in the Services, we cannot always prevent misuse of our Services, and you agree that we are not responsible for any such misuse. You also acknowledge the risk that others may share inaccurate or misleading information about you or your organization, and that you or your organization may be mistakenly associated with content about others, for example, when we let connections and followers know you or your organization were mentioned in the news.</p>
        <p>Others' Products and Services: CMJ may help connect you to other Members (e.g., Members using our enterprise recruiting, jobs, sales, or marketing products) who offer you opportunities (on behalf of themselves, their organizations, or others) such as offers to become a candidate for employment or other work or offers to purchase products or services. You acknowledge that CMJ does not perform these offered services, employ those who perform these services, or provide these offered products.</p>
        <p>You further acknowledge that CMJ does not supervise, direct, control, or monitor Members in the making of these offers, or in their providing you with work, delivering products or performing services, and you agree that (1) CMJ is not responsible for these offers, or performance or procurement of them, (2) CMJ does not endorse any particular Member's offers, and (3) CMJ is not an agent or employment agency on behalf of any Member offering employment or other work, products or services. With respect to employment or other work, CMJ does not make employment or hiring decisions on behalf of Members offering opportunities and does not have such authority from Members or organizations using our products.</p>
        <p>Others' Events: Similarly, CMJ may help you register for and/or attend events organized by Members and connect with other Members who are attendees at such events. You agree that (1) CMJ is not responsible for the conduct of any of the Members or other attendees at such events, (2) CMJ does not endorse any particular event listed on our Services, (3) CMJ does not review and/or vet any of these events or speakers, and (4) you will adhere to the terms and conditions that apply to such events.</p>

        <h3>3.4. Limits</h3>
        <p>CMJ reserves the right to limit your use of the Services, including the number of your connections and your ability to contact other Members. CMJ reserves the right to restrict, suspend, or terminate your account if you breach this Contract or the law or are misusing the Services (e.g., violating any of the Dos and Don'ts).</p>
        <p>We can also remove any content or other information you shared if we believe it violates our Dos and Don'ts or otherwise violates this Contract.</p>

        <h3>3.5. Intellectual Property Rights</h3>
        <p>CMJ reserves all of its intellectual property rights in the Services. Trademarks and logos used in connection with the Services are the trademarks of their respective owners. CMJ, and CMJ's logos and other CMJ trademarks, service marks, graphics and logos used for our Services are trademarks or registered trademarks of CMJ.</p>

        <h3>3.6. Recommendation and Automated Processing</h3>
        <p>Recommendations: We use the data and other information that you provide and that we have about Members and content on the Services to make recommendations for connections, content, ads, and features that may be useful to you. We use that data and other information to recommend and to present information to you in an order that may be more relevant for you. For example, that data and information may be used to recommend jobs to you and you to recruiters and to organize content in your feed in order to optimize your experience and use of the Services. Keeping your profile accurate and up to date helps us to make these recommendations more accurate and relevant.</p>
        <p>AI Features: By using the Services, you may interact with features we offer that use artificial intelligence or you may use AI based features and product outside the Services. The content that is generated with AI based tools inside or outside the Services might be inaccurate, incomplete, delayed, misleading or not suitable for your purposes. Please review and edit such content before sharing with others. Like all content you share on our Services, you are responsible for ensuring it complies with our policies, including not sharing misleading information.</p>
      `
    },
    disclaimerAndLimitOfLiability: {
      title: 'Disclaimer and Limit of Liability',
      content: `
        <h3>4.1. No Warranty</h3>
        <p>CMJ AND ITS AFFILIATES MAKE NO REPRESENTATION OR WARRANTY ABOUT THE SERVICES, INCLUDING ANY REPRESENTATION THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, AND PROVIDE THE SERVICES (INCLUDING CONTENT AND INFORMATION) ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, CMJ AND ITS AFFILIATES DISCLAIM ANY IMPLIED OR STATUTORY WARRANTY, INCLUDING ANY IMPLIED WARRANTY OF TITLE, ACCURACY OF DATA, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. NEITHER CMJ NOR ANY OWNER OF CONTENT WARRANTS THAT THE SERVICES OR CONTENT IS FREE OF MALWARE OR OTHER HARMFUL COMPONENTS. IN ADDITION, CMJ MAKES NO REPRESENTATION REGARDING, NOR DOES IT WARRANT OR ASSUME ANY RESPONSIBILITY FOR, ANY THIRD-PARTY APPLICATIONS (OR THE CONTENT THEREOF), USER CONTENT, DEVICES OR ANY PRODUCT OR SERVICE ADVERTISED, PROMOTED OR OFFERED BY A THIRD PARTY ON OR THROUGH THE SERVICES OR ANY HYPERLINKED WEBSITE, AND CMJ IS NOT RESPONSIBLE FOR ANY TRANSACTIONS BETWEEN YOU AND ANY THIRD-PARTY OF THE FOREGOING. NO ADVICE OR INFORMATION WHETHER ORAL OR IN WRITING OBTAINED BY YOU FROM CMJ SHALL CREATE ANY WARRANTY ON BEHALF OF CMJ. THIS SECTION APPLIES TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.</p>

        <h3>4.2. Exclusion of Liability</h3>
        <p>TO THE FULLEST EXTENT PERMITTED BY LAW (AND UNLESS CMJ HAS ENTERED INTO A SEPARATE WRITTEN AGREEMENT THAT OVERRIDES THIS CONTRACT), CMJ, INCLUDING ITS AFFILIATES, WILL NOT BE LIABLE IN CONNECTION WITH THIS CONTRACT FOR LOST PROFITS OR LOST BUSINESS OPPORTUNITIES, REPUTATION (E.G., OFFENSIVE OR DEFAMATORY STATEMENTS), LOSS OF DATA (E.G., DOWN TIME OR LOSS, USE OF, OR CHANGES TO, YOUR INFORMATION OR CONTENT) OR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR PUNITIVE DAMAGES.</p>
        <p>CMJ AND ITS AFFILIATES WILL NOT BE LIABLE TO YOU IN CONNECTION WITH THIS CONTRACT FOR ANY AMOUNT THAT EXCEEDS (A) THE TOTAL FEES PAID OR PAYABLE BY YOU TO CMJ FOR THE SERVICES DURING THE TERM OF THIS CONTRACT, IF ANY, OR (B) US $250.</p>

        <h3>4.3. Basis of the Bargain; Exclusions</h3>
        <p>The limitations of liability in this Section 4 are part of the basis of the bargain between you and CMJ and shall apply to all claims of liability (e.g., warranty, tort, negligence, contract and law) even if CMJ or its affiliates has been told of the possibility of any such damage, and even if these remedies fail their essential purpose.</p>
        <p>THESE LIMITATIONS OF LIABILITY DO NOT APPLY TO LIABILITY FOR DEATH OR PERSONAL INJURY OR FOR FRAUD, GROSS NEGLIGENCE OR INTENTIONAL MISCONDUCT, OR IN CASES OF NEGLIGENCE, WHERE A MATERIAL OBLIGATION HAS BEEN BREACHED. A MATERIAL OBLIGATION BEING AN OBLIGATION WHICH FORMS A PREREQUISITE TO OUR DELIVERY OF SERVICES AND ON WHICH YOU MAY REASONABLY RELY, BUT ONLY TO THE EXTENT THAT THE DAMAGES WERE DIRECTLY CAUSED BY THE BREACH AND WERE FORESEEABLE UPON CONCLUSION OF THIS CONTRACT AND TO THE EXTENT THAT THEY ARE TYPICAL IN THE CONTEXT OF THIS CONTRACT.</p>

        <h3>4.4. Indemnification</h3>
        <p>You agree to indemnify and hold CMJ harmless from and against any reasonably foreseeable direct losses, damages, and reasonable expenses (including reasonable attorney fees and costs) suffered or incurred by CMJ arising out of or related to: (1) your breach of any of the terms of this Contract (including any additional CMJ terms and conditions incorporated herein); (2) any User Content you post or otherwise contribute; (3) any activity in which you engage on or through the Services; and (4) your violation of any law or the rights of a third party.</p>
      `
    },
    termination: {
      title: 'Termination',
      content: `
        <p>Both you and CMJ may terminate this Contract at any time with notice to the other. On termination, you lose the right to access or use the Services. The following shall survive termination:</p>
        <ol>
          <li>Our rights to use and disclose your feedback;</li>
          <li>Section 3 (subject to 3.1.i);</li>
          <li>Sections 4, 6, 7, and 8.2 of this Contract; and</li>
          <li>Any amounts owed by either party prior to termination remain owed after termination.</li>
        </ol>
      `
    },
    disputeResolution: {
      title: 'Dispute Resolution',
      content: `
        <h3>6.1. Governing Law and Jurisdiction</h3>
        <p>Unless otherwise required by mandatory laws in your country of residence, the Contract (and any non-contractual disputes/claims arising out of or in connection with them) are subject to the laws of Sweden, without regard to choice or conflicts of law principles.</p>
        <p>Further, you and CMJ agree to the jurisdiction of the Courts of Sweden to resolve any dispute, claim, or controversy that arises in connection with the Contract (and any non-contractual disputes/claims arising out of or in connection with them), except where under applicable mandatory laws, you can choose to bring legal proceedings in your country of residence, or we are required to only bring legal proceedings in your country of residence</p>

        <h3>6.2. Class Action Waiver</h3>
        <p>WHERE PERMITTED UNDER THE APPLICABLE LAW, YOU AND CMJ AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION. Unless both you and CMJ agree, no arbitrator or judge may consolidate more than one person's claims or otherwise preside over any form of a representative or class proceeding.</p>
      `
    },
    generalTerms: {
      title: 'General Terms',
      content: `
        <h3>7.1. Changes</h3>
        <p>We may make changes to the terms of this Contract (including any additional CMJ terms and conditions incorporated by reference herein) from time to time by notifying you of such changes by any reasonable means (before they take effect), including by posting a revised Contract on the applicable Services (provided that, for material changes, we will seek to supplement such notice by email, an in-service pop-up message, or other means). Any such changes will not apply to any dispute between you and us arising prior to the date on which we posted the revised Contract, or other CMJ terms and conditions, incorporating such changes, or otherwise notified you of such changes. Your use of the Services following any changes to the terms of this Contract will constitute your acceptance of such changes. If you do not wish to continue using the Services under the updated terms, you may close your account.</p>

        <h3>7.2. Entire Agreement</h3>
        <p>Other than as stated in this section or as explicitly agreed upon in writing between you and CMJ, the terms of this Contract (including additional terms that may be provided by us when you engage with a feature of the Services) constitute all the terms and conditions agreed upon between you and CMJ and supersede any prior agreements in relation to the subject matter of these terms, whether written or oral.</p>

        <h3>7.3. Severability and Waiver</h3>
        <p>Unless as otherwise stated in the terms of this Contract, should any provision of these terms be held invalid or unenforceable for any reason or to any extent, the remaining provisions of these terms will not be affected, and the application of that provision shall be enforced to the extent permitted by law.</p>
        <p>Any failure by CMJ or any third-party beneficiary to enforce these terms or any provision thereof shall not mean that CMJ or any third party waive its rights to do so.</p>

        <h3>7.4. Assignment</h3>
        <p>You may not assign or transfer this Contract (or your membership or use of Services) to anyone without our consent. However, you agree that CMJ may assign this Contract to its affiliates or a party that buys it without your consent.</p>
      `
    },
    cmjDosAndDonts: {
      title: 'CMJ Dos and Don\'ts',
      content: `
        <h3>8.1. Dos</h3>
        <p>You agree that you will:</p>
        <ol>
          <li>Comply with all applicable laws, including, without limitation, privacy laws, intellectual property laws, anti-spam laws, export control laws, laws governing the content shared, and other applicable laws and regulatory requirements;</li>
          <li>Provide accurate contact and identity information to us and keep it updated;</li>
          <li>Use your real name on your profile; and</li>
          <li>Use the Services in a professional manner.</li>
        </ol>

        <h3>8.2. Don'ts</h3>
        <p>You agree that you will not:</p>
        <ol>
          <li>Create a false identity on CMJ, misrepresent your identity, create a Member profile for anyone other than yourself (a real person), or use or attempt to use another's account (such as sharing log-in credentials or copying cookies);</li>
          <li>Develop, support or use software, devices, scripts, robots or any other means or processes (such as crawlers, browser plugins and add-ons or any other technology) to scrape or copy the Services, including profiles and other data from the Services;</li>
          <li>Override any security feature or bypass or circumvent any access controls or use limits of the Services (such as search results, profiles, or videos);</li>
          <li>Copy, use, display or distribute any information (including content) obtained from the Services, whether directly or through third parties (such as search tools or data aggregators or brokers), without the consent of the content owner (such as CMJ for content it owns);</li>
          <li>Disclose information that you do not have the consent to disclose (such as confidential information of others (including your employer));</li>
          <li>Violate the intellectual property rights of others, including copyrights, patents, trademarks, trade secrets or other proprietary rights. For example, do not copy or distribute (except through the available sharing functionality) the posts or other content of others without their permission, which they may give by posting under a Creative Commons license;</li>
          <li>Violate the intellectual property or other rights of CMJ, including, without limitation, (i) copying or distributing our learning videos or other materials, (ii) copying or distributing our technology, unless it is released under open source licenses; or (iii) using the word "CoinMarketJob", "CMJ" or our logos in any business name, email, or URL;</li>
          <li>Post (or otherwise share) anything that contains software viruses, worms, or any other harmful code;</li>
          <li>Reverse engineer, decompile, disassemble, decipher or otherwise attempt to derive the source code for the Services or any related technology that is not open source;</li>
          <li>Imply or state that you are affiliated with or endorsed by CMJ without our express consent (e.g., representing yourself as an accredited CMJ trainer);</li>
          <li>Rent, lease, loan, trade, sell/re-sell or otherwise monetize the Services or related data or access to the same, without CMJ's consent;</li>
          <li>Deep-link to our Services for any purpose other than to promote your profile or a Group on our Services, without CMJ's consent;</li>
          <li>Use bots or other unauthorized automated methods to access the Services, add or download contacts, send or redirect messages, create, comment on, like, share, or re-share posts, or otherwise drive inauthentic engagement;</li>
          <li>Engage in "framing", "mirroring", or otherwise simulating the appearance or function of the Services;</li>
          <li>Overlay or otherwise modify the Services or their appearance (such as by inserting elements into the Services or removing, covering, or obscuring an advertisement included on the Services);</li>
          <li>Interfere with the operation of, or place an unreasonable load on, the Services (e.g., spam, denial of service attack, viruses, manipulating algorithms);</li>
          <li>Violate the CMJ's policies, certain third party terms where applicable, or any additional terms concerning a specific Service that are provided when you sign up for or start using such Service;</li>
          <li>Use our Services to do anything that is unlawful, misleading, discriminatory, or fraudulent; and/or</li>
          <li>Misuse our reporting or appeals process, including by submitting duplicative, fraudulent or unfounded reports, complaints or appeals.</li>
        </ol>
      `
    },
    complaintsRegardingContents: {
      title: 'Complaints Regarding Contents',
      content: `
        <p>We ask that you report content and other information that you believe violates your rights (including intellectual property rights), our policies or otherwise violates this Contract or the law. To the extent possible under law, we may remove or restrict access to content, features, services, or information, including if we believe that it's reasonably necessary to avoid harm to CMJ or others, violates the law or is reasonably necessary to prevent misuse of our Services. We reserve the right to take action against serious violations of this Contract, including by implementing account restrictions for significant violations.</p>
        <p>We respect the intellectual property rights of others. We require that information shared by Members be accurate and not in violation of the intellectual property rights or other rights of third parties.</p>
      `
    },
    contact: {
      title: 'Contact',
      content: `
        <p>You agree that the only way to provide us legal notice is at the addresses provided in this Section.</p>
        <p>For general inquiries, you may contact us online via mail addresses provided below. For legal notices or service of process, you may write us at the addresses provided below.</p>
        <p>Mail Address: [__]</p>
        <p>Address for Legal Notice: [__]</p>
      `
    }
  };

  Object.keys(sections).forEach((key) => {
    sectionRefs.current[key] = React.createRef<HTMLDivElement>();
  });

  const scrollToSection = (sectionKey: string) => {
    sectionRefs.current[sectionKey]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <h2>Terms of Service</h2>
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
  );
};

export default TermsOfService;