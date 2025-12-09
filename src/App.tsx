import React, { useState, createContext, useEffect, useMemo } from 'react'
import './App.css'
import { AudioProvider } from './AudioProvider';
import { AudioPlayer } from './components/player/AudioPlayer'
import { FormattedDate } from './FormattedDate';
import { type Episode, getAllEpisodes } from './episodes'
import { EpisodePlayButton } from './EpisodePlayButton.tsx';
import { PauseIcon } from './PauseIcon';
import { PlayIcon } from './PlayIcon';
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

const navigation = {
  main: [
  ],
  social: [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/_planbsecurity/?hl=en',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/_planbsecurity/?hl=en',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/planbsecurity',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCLG2Xu72da2a8xP6-1UxkwQ?themeRefresh=1',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Spotify',
      href: 'https://open.spotify.com/show/1I1lWiytUs20VRnLz1aUQb',
      icon: (props) => <SpotifyIcon {...props} />,
    },
    {
      name: 'Apple Podcasts',
      href: 'https://podcasts.apple.com/gb/podcast/plan-b-security/id1702358824',
      icon: (props) => <ApplePodcastIcon {...props} />,
    },
  ],
}

function SpotifyIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 32 32" {...props}>
      <path d="M15.8 3a12.8 12.8 0 1 0 0 25.6 12.8 12.8 0 0 0 0-25.6Zm5.87 18.461a.8.8 0 0 1-1.097.266c-3.006-1.837-6.787-2.252-11.244-1.234a.796.796 0 1 1-.355-1.555c4.875-1.115 9.058-.635 12.432 1.427a.8.8 0 0 1 .265 1.096Zm1.565-3.485a.999.999 0 0 1-1.371.33c-3.44-2.116-8.685-2.728-12.755-1.493a1 1 0 0 1-.58-1.91c4.65-1.41 10.428-.726 14.378 1.7a1 1 0 0 1 .33 1.375l-.002-.002Zm.137-3.629c-4.127-2.45-10.933-2.675-14.871-1.478a1.196 1.196 0 1 1-.695-2.291c4.52-1.374 12.037-1.107 16.785 1.711a1.197 1.197 0 1 1-1.221 2.06" />
    </svg>
  )
}

function ApplePodcastIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.528 24.8c-.232.592-.768 1.424-1.536 2.016-.44.336-.968.664-1.688.88-.768.232-1.72.304-2.904.304H10.6c-1.184 0-2.128-.08-2.904-.304a4.99 4.99 0 0 1-1.688-.88c-.76-.584-1.304-1.424-1.536-2.016C4.008 23.608 4 22.256 4 21.4V10.6c0-.856.008-2.208.472-3.4.232-.592.768-1.424 1.536-2.016.44-.336.968-.664 1.688-.88C8.472 4.08 9.416 4 10.6 4h10.8c1.184 0 2.128.08 2.904.304a4.99 4.99 0 0 1 1.688.88c.76.584 1.304 1.424 1.536 2.016C28 8.392 28 9.752 28 10.6v10.8c0 .856-.008 2.208-.472 3.4Zm-9.471-6.312a1.069 1.069 0 0 0-.32-.688c-.36-.376-.992-.624-1.736-.624-.745 0-1.377.24-1.737.624-.183.2-.287.4-.32.688-.063.558-.024 1.036.04 1.807v.009c.065.736.184 1.72.336 2.712.112.712.2 1.096.28 1.368.136.448.625.832 1.4.832.776 0 1.273-.392 1.4-.832.08-.272.169-.656.28-1.368.152-1 .273-1.976.337-2.712.072-.776.104-1.256.04-1.816ZM16 16.375c1.088 0 1.968-.88 1.968-1.967 0-1.08-.88-1.968-1.968-1.968s-1.968.88-1.968 1.968.88 1.967 1.968 1.967Zm-.024-9.719c-4.592.016-8.352 3.744-8.416 8.336-.048 3.72 2.328 6.904 5.648 8.072.08.032.16-.04.152-.12a35.046 35.046 0 0 0-.041-.288c-.029-.192-.057-.384-.079-.576a.317.317 0 0 0-.168-.232 7.365 7.365 0 0 1-4.424-6.824c.04-4 3.304-7.256 7.296-7.288 4.088-.032 7.424 3.28 7.424 7.36 0 3.016-1.824 5.608-4.424 6.752a.272.272 0 0 0-.168.232l-.12.864c-.016.088.072.152.152.12a8.448 8.448 0 0 0 5.648-7.968c-.016-4.656-3.816-8.448-8.48-8.44Zm-5.624 8.376c.04-2.992 2.44-5.464 5.432-5.576 3.216-.128 5.88 2.456 5.872 5.64a5.661 5.661 0 0 1-2.472 4.672c-.08.056-.184-.008-.176-.096.016-.344.024-.648.008-.96 0-.104.04-.2.112-.272a4.584 4.584 0 0 0 1.448-3.336 4.574 4.574 0 0 0-4.752-4.568 4.585 4.585 0 0 0-4.392 4.448 4.574 4.574 0 0 0 1.448 3.456c.08.072.12.168.112.272-.016.32-.016.624.008.968 0 .088-.104.144-.176.096a5.65 5.65 0 0 1-2.472-4.744Z"
      />
    </svg>
  )
}

function RSSIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 4h15A4.5 4.5 0 0 1 28 8.5v15a4.5 4.5 0 0 1-4.5 4.5h-15A4.5 4.5 0 0 1 4 23.5v-15A4.5 4.5 0 0 1 8.5 4ZM13 22a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6-6a9 9 0 0 1 9 9h3A12 12 0 0 0 7 13v3Zm5.74-4.858A15 15 0 0 0 7 10V7a18 18 0 0 1 18 18h-3a15 15 0 0 0-9.26-13.858Z"
      />
    </svg>
  )
}

function PersonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

let episodes = await getAllEpisodes("https://anchor.fm/s/e741494c/podcast/rss")

function App() {
  const gtmParams = { id: 'G-W86BT3ZBT6' }

  useEffect(() => {
    // Handle route-based navigation to episodes (e.g., /12345678)
    const path = window.location.pathname.slice(1) // Remove leading slash
    if (path && /^\d+$/.test(path)) {
      const element = document.getElementById(path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <>
      <GTMProvider state={gtmParams}>
        <AudioProvider>
            {/* */}
            <nav className="bg-white  dark:bg-gray-900 w-full p-2 border-none	border-gray-200 dark:border-gray-600">
              <div className="items-center mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                      <div className="flex items-center justify-center sm:justify-normal sm:ml-6 md:pr-8 text-center sm:text-left">
                        <span className="font-bold text-2xl dark:text-white text-gray-800">
                          PlanB Security
                        </span>
                      </div>

                      <div className="flex mt-2">
                      {episodes.length > 0 && 
                        <a className="flex w-full items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 pl-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200" href={"#"+episodes[0].id}>
                          <span className="font-bold">New!</span> <span className="font-bold dark:text-white text-gray-800 hover:text-orange-300">{episodes[0].title}</span>
                          <span className="py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                            <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </span>
                        </a>
                      }
                      </div>

                    <div className="flex lg:pl-8 mt-3 text-right justify-center text-slate-500">
                      <span className="font-mono pr-2">Hosted by: </span> <a className="font-bold" target="_blank" href="https://x.com/mikemackintosh">@mikemackintosh</a>
                    </div>
                  </div>
                </div>
            </nav>
              
            {/* */}
            <main className="isolate">
            {/* Hero section */}
            <div className="relative isolate -z-10">
              <svg
                className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
              </svg>
              <div
                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                aria-hidden="true"
              >
                <div
                  className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                  style={{
                    clipPath:
                      'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <div className="max-w-7xl px-6">
                  <div className=" max-w-2xl gap-x-16 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="pt-8 w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        PlanB Security is a Podcast talking about all things <span className="bg-purple-300 px-1 hover:bg-slate-800 hover:text-white hover:cursor-pointer">#InfoSec</span>, helping you prepare for when things go wrong.
                      </h1>
                      <div
                  className="mt-4 col-span-4 grid grid-cols-4 justify-center gap-10 mx-4 text-base font-medium leading-7 text-slate-800 sm:gap-8 lg:flex-col lg:gap-4"
                >
                  {(
                    [
                      ['Spotify', SpotifyIcon, "https://open.spotify.com/show/1I1lWiytUs20VRnLz1aUQb"],
                      ['Apple', ApplePodcastIcon, "https://podcasts.apple.com/gb/podcast/plan-b-security/id1702358824"],
                      ['RSS Feed', RSSIcon, "https://anchor.fm/s/e741494c/podcast/rss"],
                    ] as const
                  ).map(([label, Icon, URL]) => (
                    <div key={label} className="flex">
                      <a
                        href={URL}
                        className="group flex items-center"
                        aria-label={label}
                      >
                        <div className={"flex ml-18 items-center gap-x-1 bg-white border border-gray-200 text-sm text-gray-800 p-1 pl-2 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200"}>
                          <Icon className="h-8 w-8 pr-1 md:pr-0 fill-purple-400 group-hover:fill-orange-400" />
                          <span className="hidden sm:ml-3 sm:block pr-4">{label}</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
                      <p className="relative mt-6 text-lg text-gray-100 font-semibold leading-5 sm:max-w-md lg:max-w-none">
                        Security is not just a technical problem anymore. The industry is changing everyday, with new laws, regulations, requirements, attacks, threats, tooling and more. Join us every week as we touch upon new topics and new ways of thinking so you can grow through building a strong security program.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-12 pt-16 sm:pb-4 lg:pt-12 mx-6">
                <h1 className="text-2xl font-bold leading-7 text-slate-900">
                  Episodes
                </h1>
              <div className="">
                {episodes.map((episode) => (
                  <EpisodeEntry key={episode.id} episode={episode} />
                ))}
              </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-10">
              <AudioPlayer />
            </div>
          </main>

          <footer className="bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
              <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                {navigation.main.map((item) => (
                  <div key={item.name} className="pb-6">
                    <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                      {item.name}
                    </a>
                  </div>
                ))}
              </nav>
              <div className="mt-10 flex justify-center space-x-10">
                {navigation.social.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <p className="mt-10 text-center text-xs leading-5 text-gray-500">
                {/* <span className="flex items-center w-full justify-center">
                  <svg width="12px" height="12px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>emoji_happy_circle [#537]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-100.000000, -5839.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M60,5687 C60,5688.105 59.105,5689 58,5689 C56.895,5689 56,5688.105 56,5687 C56,5685.895 56.895,5685 58,5685 C59.105,5685 60,5685.895 60,5687 M58.891,5691.156 C57.877,5696.281 50.123,5696.281 49.109,5691.156 C48.99,5690.552 49.492,5690 50.108,5690 C50.588,5690 50.98,5690.347 51.092,5690.814 C51.787,5693.729 56.213,5693.729 56.908,5690.814 C57.02,5690.347 57.412,5690 57.892,5690 C58.508,5690 59.01,5690.552 58.891,5691.156 M50,5689 C48.895,5689 48,5688.105 48,5687 C48,5685.895 48.895,5685 50,5685 C51.105,5685 52,5685.895 52,5687 C52,5688.105 51.105,5689 50,5689 M54,5697 C49.589,5697 46,5693.411 46,5689 C46,5684.589 49.589,5681 54,5681 C58.411,5681 62,5684.589 62,5689 C62,5693.411 58.411,5697 54,5697 M54,5679 C48.477,5679 44,5683.477 44,5689 C44,5694.523 48.477,5699 54,5699 C59.523,5699 64,5694.523 64,5689 C64,5683.477 59.523,5679 54,5679" id="emoji_happy_circle-[#537]"> </path> </g> </g> </g> </g></svg>
                  <svg width="12px" height="12px" fill="none" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="m6.86026 5.77372c1.35712-1.29187 3.20534-2.02372 5.13974-2.02372s3.7826.73185 5.1397 2.02372c1.3559 1.29068 2.1103 3.03311 2.1103 4.84168 0 1.8548-1.1528 4.2867-2.7475 6.3044-.7856.994-1.6469 1.8462-2.4665 2.4426-.8416.6124-1.5462.8876-2.036.8876s-1.1944-.2752-2.03599-.8876c-.81961-.5964-1.68087-1.4486-2.46651-2.4426-1.59469-2.0177-2.7475-4.4496-2.7475-6.3044 0-1.80857.75439-3.551 2.11026-4.84168zm5.13974-3.52372c-2.30905 0-4.53051.87282-6.17396 2.43727-1.64472 1.56564-2.57604 3.69722-2.57604 5.92813 0 2.351 1.39264 5.1113 3.07068 7.2345.85072 1.0764 1.80764 2.0318 2.76076 2.7254.93116.6775 1.95376 1.1747 2.91856 1.1747s1.9874-.4972 2.9186-1.1747c.9531-.6936 1.91-1.649 2.7607-2.7254 1.6781-2.1232 3.0707-4.8835 3.0707-7.2345 0-2.23091-.9313-4.36249-2.576-5.92813-1.6435-1.56445-3.865-2.43727-6.174-2.43727zm-1.75 10.6591v.3301c-.0104.0052-.0272.0108-.05.0108-.67163 0-1.30306-.2432-1.75824-.657-.4528-.4116-.69176-.9538-.69176-1.5021v-.3301c.0104-.0052.02723-.0108.05-.0108.67163 0 1.30305.2432 1.75824.657.45276.4116.69176.9538.69176 1.5021zm-.05 1.8409c.3892 0 .7752-.1399 1.0702-.4081.2973-.2703.4798-.6531.4798-1.0692v-.3636c0-.9948-.4353-1.9325-1.1828-2.612-.745-.67732-1.74144-1.0471-2.7672-1.0471-.38924 0-.77523.13991-1.07019.40806-.29734.27031-.47981.65314-.47981 1.06924v.3636c0 .9948.43532 1.9325 1.18275 2.612.74505.6773 1.74149 1.0471 2.76725 1.0471zm6-4c-.6716 0-1.3031.2432-1.7582.657-.4528.4116-.6918.9538-.6918 1.5021v.3301c.0104.0052.0272.0108.05.0108.6716 0 1.3031-.2432 1.7582-.657.4528-.4116.6918-.9538.6918-1.5021v-.3301c-.0104-.0052-.0272-.0108-.05-.0108zm-2.7672-.4529c.745-.67732 1.7414-1.0471 2.7672-1.0471.3892 0 .7752.13991 1.0702.40806.2973.27031.4798.65314.4798 1.06924v.3636c0 .9948-.4353 1.9325-1.1828 2.612-.745.6773-1.7414 1.0471-2.7672 1.0471-.3892 0-.7752-.1399-1.0702-.4081-.2973-.2703-.4798-.6531-.4798-1.0692v-.3636c0-.9948.4353-1.9325 1.1828-2.612zm-3.4328 5.9529c-.41421 0-.75.3358-.75.75s.33579.75.75.75h4c.4142 0 .75-.3358.75-.75s-.3358-.75-.75-.75z" fill="#000000" fill-rule="evenodd"></path></g></svg>
                  <svg width="12px" height="12px" fill="none" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="sadFaceIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="sadFaceIconTitle">sad Face</title> <line stroke-linecap="round" x1="9" y1="9" x2="9" y2="9"></line> <line stroke-linecap="round" x1="15" y1="9" x2="15" y2="9"></line> <path d="M8,16 C9.33333333,15.3333333 10.6656028,15.0003822 11.9968085,15.0011466 C13.3322695,15.0003822 14.6666667,15.3333333 16,16"></path> <circle cx="12" cy="12" r="10"></circle> </g></svg>
                </span> */}

                &copy; 2023 Mike Mackintosh. All rights reserved.

              </p>
            </div>
          </footer>
        </AudioProvider>
      </GTMProvider>
    </>
  )
}

function EpisodeEntry({ episode }: { episode: Episode }) {
  let date = new Date(episode.published)

  return (
    <>
    <a id={episode.id.toString()}/>
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
        <div className="flex flex-col items-start">
          <div className=" rounded-t-lg bg-slate-800 p-4">
            <div className="flex">
              <h2
                id={`episode-${episode.id}-title`}
                className="flex-grow mt-2 pr-4 text-xl font-bold text-slate-100 "
              >
                <a href={`/${episode.id}`}>{episode.title}</a>
              </h2>
              <div className="flex-none font-bold text-sm w-14 items-center mr-4 mt-4 text-right">
                <span className="text-white font-mono justify-end">
                  {episode.itunes_duration}
                </span>
              </div>
            </div>
            <FormattedDate
              date={date}
              className="order-first font-mono leading-7 text-sm text-slate-500"
            />
            <p className="mt-1 pb-2 leading-7 text-slate-300">
              {episode.description.replace("<p>", "").replace("</p>", "")}
            </p>
          </div>
          <div className="w-full px-5 pb-3 pt-3 flex items-center gap-4 rounded-b-lg bg-slate-700 border-t border-t-slate-600 border-b border-b-slate-900">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm font-bold leading-6 text-purple-400 hover:text-orange-400"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true" className="text-md">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true" className="text-md">Listen</span>
                </>
              }
            />
            {/* <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <a
              href={`/${episode.id}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </a> */}
          </div>
        </div>
    </article>
    </>
  )
}

export default App
