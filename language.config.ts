export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'id',
  fallbackLocale: 'en',
  message: {}
  // messages: {
  //   en: {
  //     name: 'Muhammad Syahendra Anindyantoro',
  //     title: 'Frontend Developer',
  //     aboutTitle: 'About Me',
  //     paragraph_1:
  //       'I am Muhammad Syahendra Anindyantoro a Frontend Developer or Frontend Engineer with a Bachelor`s degree in Electrical Engineering and 5 years of experience in IT. I have expertise in using modern technologies such as React and Vue to develop interactive, detailed, and high-quality user interfaces.',
  //     paragraph_2:
  //       'My strengths are that I am a hardworking person. I like teams because I can get the job done quickly. I`m a fast learner, and I like challenges. however, I`m not a very good speaker so I`m used to getting to know and building teams so I can communicate well.',
  //     paragraph_3:
  //       'With a combination of technical expertise, interpersonal skills, and a passion for learning, I remain committed to my work.',
  //     workTitle: 'Work Experience',
  //     workExperiences: [
  //       {
  //         role: 'Frontend Developer',
  //         location: 'Yogyakarta, Indonesia',
  //         period: 'Okt 2025 - Dec 2025',
  //         company: 'Panglima Propertindo',
  //         type: 'Contract',
  //         desc: 'Developing a funeral booking app called the Insira appDevelop apps ',
  //         stackUsed: [
  //           'Next 15 & 16',
  //           'Github',
  //           'Shadcn UI',
  //           'Lark',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //             'Implemented UI/UX designs_built new features_fixed existing bugs.',
  //         },
  //       },
  //       {
  //         role: 'Frontend Developer',
  //         location: 'Jakarta, Indonesia',
  //         period: 'Aug 2025 - Dec 2025',
  //         company: 'Geek Garden',
  //         type: 'Contract',
  //         desc: 'Developed the Scyllax TPM (Trade Promotion Management) App using Vue 3, worked on the Annual Budget and Approval Schema modules',
  //         stackUsed: [
  //           'Vue 3',
  //           'Gitlab',
  //           'Tailwind CSS',
  //           'Pinia',
  //           'Jira',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //             'Implemented UI/UX designs_built new features_fixed existing bugs.',
  //         },
  //       },
  //       {
  //         role: 'Frontend Engineer',
  //         location: 'Yogyakarta, Indonesia',
  //         period: 'Jul 2021 - Jun 2025',
  //         company: 'Privy ID',
  //         type: 'Full time',
  //         desc: 'Developed interactive web pages using Vue and React.',
  //         stackUsed: [
  //           'Next.js',
  //           'Nuxt 2 & 3',
  //           'Gitlab',
  //           'Tailwind CSS',
  //           'Vuetify',
  //           'Pinia & Vuex',
  //           'Jira',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //             'Used markup languages like HTML to build user-friendly web pages_Optimized applications for maximum speed_Created and implemented the design from the UI/UX team_Built and implemented UI/UX team designs_Collected feedback forms and built solutions for users and customers_Assisted backend developers with coding and troubleshooting_Performed UI testing to optimize performance_Fixed bugs or issues encountered during application trial phases_Prepared applications for release processes_Kept up with emerging technologies',
  //         },
  //       },
  //       {
  //         role: 'Frontend Developer',
  //         location: 'Depok, Indonesia',
  //         period: 'Jul 2020 - Jun 2021',
  //         company: 'PT. Nashta Global Utama',
  //         type: 'Contract',
  //         desc: 'Developed application modules for Customs CEISA 4.0.',
  //         stackUsed: [
  //           'React.js',
  //           'Gitlab',
  //           'Tailwind CSS',
  //           'Antd Design',
  //           'Redux',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //             'On-site Customs CEISA 4.0._Developed modules for the customs office_Maintained the CEISA application_Developed licensing and manifest modules for customs',
  //         },
  //       },
  //     ],
  //     educationTitle: 'Education',
  //     education: {
  //       ums: "Bachelor's degree, Electrical Engineering (Strong Current) at Universitas Muhammadiyah Surakarta, GPA: 3.39",
  //     },
  //     skillsTitle: 'Skills',
  //     location: 'Yogyakarta, Indonesia',
  //     phone: 'Phone',
  //     email: 'Email',
  //     website: 'Website',
      // project: {
      //   cashsir_app2:
      //     'This project uses Nuxt 3, which is a simple POSapp and can still be developed',
      //   cashsir_app:
      //     'This project uses Next.js version 15, which is a simple POSapp and can still be developed',
      //   operator:
      //     'This project is for checking provider number and prefix around the world',
      //   seller_be: 'This project was built using ExpressJS, prisma, posgresql',
      //   seller_dashboard:
      //     'This project was built using Next.js version 15 and includes authentication features such as login, registration, and the ability to create Menu and Menu management.',
      //   auth: 'This project was developed using ExpressJS, featuring a simple authentication system with login, registration, and logout functionality.',
      //   octo: 'Maintenance landing octo saver',
      //   landing_privy: 'Update wording and update needed website privy',
      //   ccpl: 'CIMB app for credit card applications and loan applications',
      //   ronin:
      //     'Application privy internal for check log by Application privy orther',
      //   bni: 'Maintenance dashboard and landing for applying credit card bank BNI',
      //   ceisa: 'Application for taxation from customs',
      //   gardu: 'Temperature monitoring device for wonogiri substation panel.',
      //   App_tele_privy: 'Apps for document verification and data validation',
      //   adonara_dashboard:
      //     'Similar to the tele privy app this is the updated version but more updated',
      // },
  //   },
  //   id: {
  //     name: 'Muhammad Syahendra Anindyantoro',
  //     title: 'Frontend Developer',
  //     aboutTitle: 'Tentang Saya',
  //     paragraph_1:
  //       'Saya Muhammad Syahendra Anindyantoro seorang Frontend Developer atau Frontend Engineer dengan latar belakang pendidikan Sarjana Teknik Elektro dan pengalaman selama 5 tahun di dunia IT. Saya memiliki keahlian dalam menggunakan teknologi modern seperti React dan Vue untuk mengembangkan antarmuka pengguna yang interaktif, detail, dan berkualitas tinggi.',
  //     paragraph_2:
  //       'Kelebihan saya orangnya pekerja keras. saya menyukai tim karna dapat menyelesaikan pekerjaan dengan cepat. Saya orangnya berdapatasi dengan cepat. dan juga menyukai tantangan. namun kekurangannya saya orangnya tidak pandai berbicara maka dari itu saya dibiasakan untuk mengenal dan membuat tim agar bisa berkomunikasi dengan baik.',
  //     paragraph_3:
  //       'Dengan kombinasi keahlian teknis, kemampuan interpersonal, dan semangat belajar yang tinggi, Saya terus berkomitmen pada pekerjaan saya.',
  //     workTitle: 'Pengalaman Kerja',
  //     workExperiences: [
  //       {
  //         role: 'Frontend Developer',
  //         location: 'Yogyakarta, Indonesia',
  //         period: 'Okt 2025 - Des 2025',
  //         company: 'Panglima Propertindo',
  //         type: 'Contract',
  //         desc: 'Develop apps pemesanan pemakaman bernama apps insira',
  //         stackUsed: [
  //           'Next 15 & 16',
  //           'Github',
  //           'Shadcn UI',
  //           'Lark',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //           'Mengimplementasikan desain dari UI/UX_mengembangkan fitur-fitur baru_memperbaiki bug yang ada.',
  //         },
  //       },
  //       {
  //         role: 'Frontend Developer',
  //         location: 'Jakarta, Indonesia',
  //         period: 'Ags 2025 - Des 2025',
  //         company: 'Geek Garden',
  //         type: 'Kontrak',
  //         desc: 'Mengembangkan Apps Scyllax TPM (Trade Promotion Management) dengan Vue 3, Mengerjakan module Annual Budget dan Approval Schema',
  //         stackUsed: [
  //           'Vue 3',
  //           'Gitlab',
  //           'Tailwind CSS',
  //           'Pinia',
  //           'Jira',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //             'Mengimplementasikan desain dari UI/UX_mengembangkan fitur-fitur baru_memperbaiki bug yang ada.',
  //         },
  //       },
  //       {
  //         role: 'Frontend Engineer',
  //         location: 'Yogyakarta, Indonesia',
  //         period: 'Jul 2021 - Jun 2025',
  //         company: 'Privy ID',
  //         type: 'Penuh waktu',
  //         desc: 'Mengembangkan halaman web interaktif menggunakan Vue dan React.',
  //         stackUsed: [
  //           'Next.js',
  //           'Nuxt 2 & 3',
  //           'Gitlab',
  //           'Tailwind CSS',
  //           'Vuetify',
  //           'Pinia & Vuex',
  //           'Jira',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //             'Gunakan bahasa mark-up seperti HTML untuk membuat halaman web yang ramah pengguna_Mengoptimalkan aplikasi untuk kecepatan maksimum_Membuat dan mengimplementasikan desain tim UI/UX_ Dapatkan formulir umpan balik dan membangun solusi untuk pengguna dan pelanggan_Membantu pengembang backend dengan pengkodean dan pemecahan masalah_Lakukan tes UI untuk mengoptimalkan kinerja_memperbaiki bug atau masalah yang terjadi selama proses uji coba aplikasi saat digunakan_Mempersiapkan aplikasi proses rilis_Mengikuti perkembangan teknologi yang sedang berkembang',
  //         },
  //       },
  //       {
  //         role: 'Frontend Developer',
  //         location: 'Depok, Indonesia',
  //         period: 'Jul 2020 - Jun 2021',
  //         company: 'PT. Nashta Global Utama',
  //         type: 'Kontrak',
  //         desc: 'Mengembangkan modul aplikasi untuk Bea Cukai CEISA 4.0.',
  //         stackUsed: [
  //           'React.js',
  //           'Gitlab',
  //           'Tailwind CSS',
  //           'Antd Design',
  //           'Redux',
  //         ],
  //         project: {
  //           title: '',
  //           paragraph:
  //             'On site Customs CEISA 4.0._ Develop module by bea cukai _Maintenance Application CEISA_ Develop module Perijinan, and Manifest bea cukai',
  //         },
  //       },
  //     ],
  //     educationTitle: 'Pendidikan',
  //     education: {
  //       ums: 'Sarjana Teknik Elektro (Arus Kuat) di Universitas Muhammadiyah Surakarta, IPK: 3.39',
  //     },
  //     skillsTitle: 'Keahlian',
  //     location: 'Yogyakarta, Indonesia',
  //     phone: 'Telepon',
  //     email: 'Email',
  //     website: 'Situs Web',
      // project: {
      //   cashsir_app2:
      //     'Portofolio ini menggunakan Nuxt 3, simple POSapp dan masih bisa dikembangkan',
      //   cashsir_app:
      //     'Portofolio ini menggunakan Next 15 ini simple POSapp dan masih bisa dikembangkan',
      //   operator:
      //     'Portofolio ini untuk cek nomer provider dan prefix diberbagai negara didunia',
      //   seller_be: 'Portofolio ini menggunakan ExpressJS, prisma, posgresql',
      //   seller_dashboard:
      //     'Portofolio ini menggunakan Next 15 dengan fitur auth login, register dan create article dan category',
      //   auth: 'Portofolio ini dibuat menggunakan ExpressJS, dan hanya fitur auth login, register, dan logout.',
      //   octo: 'Memperbaiki bug landing octo saver',
      //   landing_privy:
      //     'Perbarui kata-kata dan perbarui situs web yang diperlukan',
      //   ccpl: 'Aplikasi CIMB untuk pengajuan kartu kredit dan pengajuan pinjaman',
      //   ronin:
      //     'Aplikasi website internal untuk memeriksa log oleh Aplikasi privy atau lainnya',
      //   bni: 'Dasbor pemeliharaan dan arahan untuk pengajuan kartu kredit bank BNI',
      //   ceisa: 'Aplikasi untuk permohonan perpajakan dari bea cukai',
      //   gardu: 'Alat pemantau suhu untuk panel gardu induk wonogiri.',
      //   App_tele_privy: 'Apps untuk memverifikasi document serta validasi data',
      //   adonara_dashboard:
      //     'Mirip seperti app tele privy ini versi pembaruannya tapi lebih update',
      // },
  //   },
  // },
}))
