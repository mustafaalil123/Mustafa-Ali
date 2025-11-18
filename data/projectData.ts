import { m } from "framer-motion";

export const projectsList = [
   {
    id: 1,
    title: 'SwitchBoard',
    imageLight: '/assets/images/projects/switchboard.png',
    blurHash: 'L4ADc400P*Zi4Tu1y;Qo00pH#YXl',
    site: 'https://app.dev.switchboardcloud.com.au/',
    description:
      "Easily integrate and automate data with your partners. Automatically connect to your partners for automated, flexible, and cost efficient supply chains, with end to end visibility",
    techStack: ['Express', 'Nodejs', 'PostgreSQL', 'Next', 'Javascript'],
    caseStudy: {
      images: [
        '/assets/images/ProjectsImage/Switchboard/Capture.PNG',
        '/assets/images/ProjectsImage/Switchboard/2.PNG',
        '/assets/images/ProjectsImage/Switchboard/4.PNG',
        '/assets/images/ProjectsImage/Switchboard/5.PNG'
      ],
      longDescription:
        'SwitchBoard is a B2B integration platform that connects suppliers and retailers through automated data flows. I worked on both backend and frontend, including partner onboarding, connection management, and event tracking.',
      role: 'Full Stack Engineer',
    },
  },
  {id:2,
    title: 'Ecom Circles',
    imageLight: '/assets/images/projects/cover/ecomcircles.png',
    blurHash: 'L4ADc400P*Zi4Tu1y;Qo00pH#YXl',
    site: 'https://app.ecomcircles.com/',
    description:
      'An application for dropshipping automation that manages repricing, item listing, order processing, and inventory management for U.S. marketplaces, including Amazon and Walmart.',
    techStack: ['MERN', 'AWS', 'Redis', 'Nginx', 'Redux'],
    caseStudy: {
      images: [
        '/assets/images/ProjectsImage/EcomCircle/1.PNG',
        '/assets/images/ProjectsImage/EcomCircle/2.PNG',
        '/assets/images/ProjectsImage/EcomCircle/3.PNG',
        '/assets/images/ProjectsImage/EcomCircle/4.PNG',
      ],
      longDescription:
        'I contributed to the development of an advanced dropshipping application designed to automate and streamline multiple critical processes, including repricing, product listing, order acknowledgment, and inventory management across major US marketplaces such as Amazon and Walmart. The platform was built to overcome challenges associated with Walmart-to-Amazon dropshipping, particularly Amazon policy restrictions. To address this, we introduced a unique two-step dropshipping model using a warehouse intermediary, enabling compliant fulfillment while maintaining operational efficiency. The application also provided in-depth business analytics, allowing users to make informed, data-driven decisions. I designed and developed the entire application architecture using Node.js, working extensively with REST APIs through Express.js and Postman, and integrating complex third-party services including Walmart APIs, Amazon SP-API, Stripe, EasyPost, and Stamps. On the frontend, I transformed Figma and wireframe designs into scalable, reusable components using React.js, SCSS, and Bootstrap, while managing application-wide state through Redux. For data storage and performance optimization, I worked with MySQL, Redis, and Sequelize ORM. I also managed file handling through AWS S3 and oversaw server setup, load balancing, and deployments using AWS EC2, Nginx, Git, PM2, and CI/CD pipelines. Alongside development, I conducted code reviews, ensured best practices, and actively mentored team members to maintain code quality and team productivity.',
      role: 'Full Stack Engineer',
    },
  },
  {id:3,
    title: 'Store Filter',
    imageLight: '/assets/images/projects/cover/storefilter.png',
    blurHash: 'L4ADc400P*Zi4Tu1y;Qo00pH#YXl',
    site: 'https://app.storefilter.com/',
    description:
     "A competitor analysis platform that focuses on keywords, ads, Shopify stores, and sales funnels to help businesses grow and understand their competitors' strategies.",
    techStack: ['Vue 3', 'VueX', 'Javascript'],
        caseStudy: {
      images: [
        '/assets/images/ProjectsImage/StoreFilter/1.PNG',
        '/assets/images/ProjectsImage/StoreFilter/2.PNG',
        '/assets/images/ProjectsImage/StoreFilter/3.PNG',
        '/assets/images/ProjectsImage/StoreFilter/4.PNG',
         '/assets/images/ProjectsImage/StoreFilter/5.PNG',
        '/assets/images/ProjectsImage/StoreFilter/6.PNG',
        '/assets/images/ProjectsImage/StoreFilter/7.PNG',
        '/assets/images/ProjectsImage/StoreFilter/8.PNG',
      ],
      longDescription:
        'The challenge was to create a tool that could provide detailed insights into social media activity, search trends, keywords, ads, PR posts, and blogs, helping businesses grow by understanding their competition. The tool provided in-depth reports on social media, keyword performance, ads, and other marketing strategies. This allowed users to refine their own strategies and stay ahead in the market.The final product delivered valuable insights, empowering businesses to make informed decisions and optimize their marketing efforts',
      role: 'Frontend',
    },
  },
  {id:4,
    title: 'Secur Watch',
    imageLight: '/assets/images/projects/cover/securwatch.png',
    blurHash: 'L4ADc400P*Zi4Tu1y;Qo00pH#YXl',
    site: 'http://secur-watch.com/',
    description:
      'An e-commerce website offering watches along with their historical reports, secured using blockchain technology.',
    techStack: ['Node', 'Next', 'MUI', 'Typescript', 'Blockchain'],
    caseStudy: {
      images: [
        '/assets/images/ProjectsImage/SecureWatch/1.PNG',
        '/assets/images/ProjectsImage/SecureWatch/2.PNG',
        '/assets/images/ProjectsImage/SecureWatch/3.PNG',
        '/assets/images/ProjectsImage/SecureWatch/4.PNG',
         '/assets/images/ProjectsImage/SecureWatch/5.PNG',
        '/assets/images/ProjectsImage/SecureWatch/6.PNG',
        '/assets/images/ProjectsImage/SecureWatch/7.PNG',
      ],
      longDescription:
        'A client in the luxury watch market needed an e-commerce platform to sell watches and provide secure historical reports.The challenge was to ensure the authenticity and security of these reports, which are crucial in the luxury market.To solve this, we integrated blockchain technology to secure and verify the historical data, ensuring transparency and trust. We developed a user-friendly platform where customers could browse and purchase watches while accessing secure, blockchain-verified historical reports. This added a layer of trust and authenticity, enhancing the buying experience.'
    ,role: 'FullStack'
   
      },
  },
  {id:5,
    title: 'MJM Tools',
    site: 'http://18.191.227.65/',
    imageLight: '/assets/images/projects/cover/mjmtools.png',
    blurHash: 'L0Aer?tjH[tPyAayj[j[00ay%xkB',
    description:
      "This is a management website designed to consolidate all of a user's Amazon marketplace activities into a single dashboard, including the management of listings, products, orders, sales, profits, and refunds.",
    techStack: ['Next', 'Javascript', 'Redux Toolkit'],
    caseStudy: {
      images: [
        '/assets/images/ProjectsImage/MJM/1.PNG',
        '/assets/images/ProjectsImage/MJM/2.PNG',
        '/assets/images/ProjectsImage/MJM/3.PNG',
        '/assets/images/ProjectsImage/MJM/4.PNG',
         '/assets/images/ProjectsImage/MJM/5.PNG',
      ],
      longDescription:
      'The challenge was to create a single dashboard that consolidated listings, orders, sales, and refunds for global Amazon marketplaces, with automated data management and error handling We developed a website that unified all activities into one dashboard, automating data pushes and creating alerts and Asana tasks for VAs if errors occurred. The final product streamlined global Amazon operations, reducing manual work and improving accuracy, showcasing our ability to create efficient, automated e-commerce management solutions.'
    ,role: 'Frontend'
    },
  },
  {id:6,
    title: 'Car Auction',
    imageLight: '/assets/images/projects/cover/carcouk.png',
    blurHash: 'L2M5%%0000EN00I:-oIp00kC?^sl',
    site: 'http://54.245.33.176:8443/login',
    description:
      'An auction website that allows users to bid on vehicles such as cars and bikes, facilitates invoice generation, vehicle delivery, and collects data on the auction winners.',
    techStack: ['React', 'MUI', 'Typescript'],
    caseStudy: {
      images: [
        '/assets/images/ProjectsImage/CarAuct/1.PNG',
        '/assets/images/ProjectsImage/CarAuct/2.PNG',
        '/assets/images/ProjectsImage/CarAuct/3.PNG',
        '/assets/images/ProjectsImage/CarAuct/4.PNG',
      ],
      longDescription:
'UK Car Auctions required a responsive platform to serve sellers and buyers effectively. The challenge was to create a website that provided a seamless experience on web and mobile devices. Additionally, the platform needed tools to facilitate the entire auction process, from listing vehicles to bidding and purchasing. We developed a responsive and user-friendly website with a design that ensured consistent performance across all devices. Sellers could easily list vehicles, while buyers could browse, bid, and purchase efficiently. The platforms features streamlined the auction process.',
      role: 'Frontend'
    },
  },

];
