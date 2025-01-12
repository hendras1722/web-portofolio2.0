<template>
  <div class="flex flex-col min-h-screen my-2">
    <div>
      <div class="rounded-full bg-[url(~/assets/me.jpg)] w-[200px] h-[200px] bg-cover bg-center mb-5">
        <img src="~/assets/me.jpg" class=" w-[200px] h-[200px] object-cover rounded-full" alt="me" />
      </div>
      <small>Yogyakarta, 2024</small>
    </div>
    <div class="mt-5 flex-1">
      <p>
        With over four years of professional experience, I am a dedicated
        Frontend Engineer at PrivyID, passionately committed to crafting
        user-friendly web pages and optimizing application performance. My
        expertise lies in React and Vue, which are the cornerstones of my
        mission to enhance user experience. PrivyID's culture of innovation
        resonates with my goal to deliver cutting-edge solutions while
        contributing diverse perspectives to our dynamic team.
      </p>
      &nbsp;
      <p>
        Currently, I am focused on implementing the UI/UX team's design vision,
        collaborating closely with back-end developers to ensure seamless
        quality and usability. My daily responsibilities include optimizing UI
        performance, gathering user feedback to inform our solutions, and
        troubleshooting alongside my colleagues to refine our applications.
        Staying at the forefront of emerging technologies, I play a key role in
        preparing for application releases and driving continuous improvement.
      </p>
      <div id="tech">
        <div class="flex items-center gap-2 my-4">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Stack technologies</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>
      </div>

      <div id="experience">
        <div class="flex items-center gap-2 my-4">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Experience</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>
        <div class="flex items-start relative">
          <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
            <img alt="icon" src="~/assets/privy.png" width="200" />
          </div>
          <div>
            <div class="font-bold">Frontend Engineer</div>
            <div class="my-1">PrivyID · Full-time</div>
            <div class="my-1 text-[12px] text-[#3D3C3C]">
              Jul 2021 - Present · 3 yrs 7 mosJul 2021 to Present · 3 yrs 7 mos
            </div>
            <div class="text-[12px] text-[#3D3C3C]">Daerah Istimewa Yogyakarta, Indonesia · On-site</div>
            <p>
              Use mark-up language like HTML to create user-friendly web pages
            <ul class="list-disc ml-5">
              <li> Optimize applications for maximum speed</li>
              <li> Create and implement the
                design of the UI/UX team</li>
              <li> Collaborate with back-end developers and
                web designers to improve quality usability</li>
              <li> Get feedback form and
                build solutions for user and customers</li>
              <li> Help backend developers
                with coding and troubleshooting</li>
              <li> Perform UI test to optimize
                performance</li>
              <li> fix bugs or problems that occurs during the
                applications trial process when used</li>
              <li> Prepare the applications
                release process</li>
              <li> stay up to date on emerging technologies</li>
            </ul>
            </p>
          </div>
        </div>
        <div class="grid place-items-center my-5">
          <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
        </div>
      </div>

      <div id="Education">
        <div class="flex items-center gap-2 my-4">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Education</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>
        <div class="flex items-start relative">
          <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
            <img alt="icon" src="~/assets/pijar.jpg" width="100" />
          </div>
          <div>
            <div class="font-bold">Pijar Camp (ex Arkademy)</div>
            <div class="my-1">FullStack Developer, Teknologi Informasi</div>
            <div class="my-1 text-[12px] text-[#3D3C3C]">
              2020 - 2021
            </div>
            <p>
              Activities and societies: <br /> - Learn ReactJS, NodeJS, and React Native programming
            </p>
          </div>
        </div>

        <div class="grid place-items-center my-5">
          <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
        </div>

        <div class="flex items-start relative">
          <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
            <img alt="icon" src="~/assets/itb_logo.jpg" width="100" />
          </div>
          <div>
            <div class="font-bold">Institut Teknologi Bandung</div>
            <div class="my-1">Digital Talent Scholarship-Internet of Things</div>
            <div class="my-1 text-[12px] text-[#3D3C3C]">
              2019 - 2019
            </div>
            <p>
              Activities and societies: Digital Talent Scholarship class IoT
            </p>
          </div>
        </div>
        <div class="grid place-items-center my-5">
          <div class="border-2 rounded border-[#3D3C3C] w-2/3 opacity-25"></div>
        </div>
        <div class="flex items-start relative">
          <div class="absolute right-0 my-auto top-0  mx-auto flex justify-start items-start h-fit -z-10 opacity-50">
            <img alt="icon" src="~/assets/ums.jpg" width="100" />
          </div>
          <div>
            <div class="font-bold">Muhammadiyah University of Surakarta</div>
            <div class="my-1">Bachelor's degree, Electrical Engineering</div>
            <div class="my-1 text-[12px] text-[#3D3C3C]">
              2014 - 2018
            </div>
            <p>
              Grade: 3.39 <br />
              Graduates of Bachelor of Electrical Engineering in Strong Current at Universitas Muhammadiyah Surakarta
            </p>
          </div>
        </div>
      </div>

      <div id="Education">
        <div class="flex items-center gap-2 my-4">
          <div class="w-3.5 ">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
          <span class="text-nowrap font-bold">Project</span>
          <div class="w-full">
            <div class="border-2 rounded border-[#3D3C3C] w-full"></div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">CIMB Octo Saver</div>
          </div>
          <div class="text-[12px]">
            Maintenance landing octo saver
          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              Landing Privy</div>
          </div>
          <div class="text-[12px]">
            Update wording and update needed website privy
          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
        <div class="border rounded-lg border-[#3D3C3C] p-5 first:mt-0 my-2 last:mb-0">
          <div>
            <div class="font-bold">
              CIMB Credit Card and Personal Loan</div>
          </div>
          <div class="text-[12px]">
            CIMB app for credit card applications and loan applications
          </div>
          <div class="border border-black p-1 my-2 rounded-lg w-fit">
            <div class="font-bold text-[10px]">Nuxt</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'without-layout',
})
</script>
