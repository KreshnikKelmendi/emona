'use client'
import React from 'react'
import { motion } from 'framer-motion'

const EmonaIcon = () => {
    return (
        <div>
            {/* Left leaf - falling down */}
            <motion.svg
                className='absolute top-7 left-3'
                width="59"
                height="37"
                viewBox="0 0 59 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [-50, 800],
                    rotate: [0, 20, -10, 20, 0],
                    x: [0, 10, -5, 8, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0
                }}
            >
                
                <path d="M54.823 27.9657C46.6006 11.4371 40.5707 3.72649 28.1238 1.09945C20.7528 -0.414298 13.6079 0.293118 6.66371 3.04128C4.8004 3.78684 3.2126 3.14206 1.43877 4.22051C0.951111 4.50539 0.72407 5.52973 0.407523 6.22118C1.03136 6.50044 1.62418 7.06691 2.1974 6.98531C6.79099 6.59172 10.744 8.64587 14.3769 12.586C17.4559 15.9317 20.5563 19.3283 23.9343 22.0613C34.1889 30.3062 45.5863 32.3644 57.246 34.5649C57.1797 33.6855 57.2339 32.8519 56.9947 32.1632C56.3587 30.171 55.4764 29.8792 54.823 27.9657ZM33.454 15.2074C30.0218 13.308 25.6353 10.705 22.0769 9.22755C18.6176 7.74497 16.1978 5.8451 12.6861 4.5989C24.1198 4.57817 37.4505 12.7935 46.6463 22.1317C43.4045 19.9628 36.7443 17.0103 33.454 15.2074Z" fill="#3FA22C"/>
                </motion.svg>

            {/* Right large leaf - falling down */}
            <motion.svg
                className='absolute top-8 right-3'
                width="51"
                height="53"
                viewBox="0 0 51 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [-80, 800],
                    rotate: [0, -20, 15, -10, 0],
                    x: [0, -15, 8, -12, 0]
                }}
                transition={{
                    duration: 17,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 3
                }}
            >
                
                <path d="M3.11362 18.495C-0.721212 27.9361 -0.668336 41.0156 1.79454 51.4582C18.5272 26.3372 41.859 22.0582 43.3653 21.9654C48.8923 20.7109 49.3415 20.0267 48.36 15.0267C48.2505 14.5854 48.1411 14.0952 48.0316 13.6539C45.3946 4.72929 37.4971 -0.196663 27.4528 0.993228C15.3993 2.51907 7.11753 8.66266 3.11362 18.495ZM43.1861 12.1675C30.9758 11.3415 15.165 17.459 8.81146 28.8998C12.946 14.8061 32.8288 8.5557 43.1861 12.1675Z" fill="#3FA22C"/>
                </motion.svg>

            {/* Small right leaf - falling down */}
            <motion.svg
                className='absolute top-6 right-14'
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [-100, 800],
                    rotate: [0, 25, -20, 30, 0],
                    x: [0, 12, -8, 10, 0]
                }}
                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 6
                }}
            >
            <path d="M8.36127 0.0256503C1.93773 2.2078 -0.998628 10.2804 2.20531 17.1495C9.1387 13.2056 12.1324 4.79037 8.36127 0.0256503Z" fill="#3FA22C"/>
            </motion.svg>

            {/* New leaf - falling down */}
            <motion.svg
                className='absolute top-40 left-14'
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [-120, 800],
                    rotate: [0, -15, 25, -20, 0],
                    x: [0, -10, 6, -8, 0]
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
            >
            <path d="M0.531399 18.9693C-0.798746 9.85571 10.0921 -1.59602 19.0067 0.538251C17.5738 11.764 10.8938 18.8927 0.531399 18.9693Z" fill="#3FA22C"/>
            </motion.svg>
            {/* Fifth leaf - falling down */}
            <motion.svg
                className='absolute bottom-6 right-14'
                width="15"
                height="35"
                viewBox="0 0 15 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [-150, 800],
                    rotate: [0, 20, -15, 25, 0],
                    x: [0, -12, 7, -10, 0]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5
                }}
            >
                <path d="M13.1074 34.328C15.725 24.7058 14.6772 15.6194 10.478 6.92941C9.19689 4.27821 7.54699 1.8415 4.63582 0.704711C-3.56194 11.7879 0.136142 25.0805 13.1074 34.328ZM5.0135 5.24596C5.3061 5.24991 7.97506 18.8944 10.306 25.0716C10.0855 25.1418 3.64737 19.7139 5.0135 5.24596Z" fill="#3FA22C"/>
                </motion.svg>

            {/* Sixth leaf - falling down */}
            <motion.svg
                className='absolute bottom-6 left-12'
                width="15"
                height="30"
                viewBox="0 0 15 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [-200, 800],
                    rotate: [0, -18, 22, -16, 0],
                    x: [0, 14, -9, 11, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 7
                }}
            >
                <path d="M13.1074 34.328C15.725 24.7058 14.6772 15.6194 10.478 6.92941C9.19689 4.27821 7.54699 1.8415 4.63582 0.704711C-3.56194 11.7879 0.136142 25.0805 13.1074 34.328ZM5.0135 5.24596C5.3061 5.24991 7.97506 18.8944 10.306 25.0716C10.0855 25.1418 3.64737 19.7139 5.0135 5.24596Z" fill="#3FA22C"/>
                </motion.svg>
            {/* Seventh leaf - falling down */}
            <motion.svg
                className='absolute bottom-6 right-0'
                width="15"
                height="30"
                viewBox="0 0 15 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                    y: [-180, 800],
                    rotate: [0, -22, 18, -14, 0],
                    x: [0, 13, -11, 9, 0]
                }}
                transition={{
                    duration: 15.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 4
                }}
            >  
                <path d="M0.36362 2.40378C0.617664 10.6747 3.59217 17.9581 9.29194 23.8882C15.0639 29.8924 24.0445 31.2576 30.2395 27.6099C29.6761 25.9927 29.1136 24.3024 28.477 22.6842C26.5721 17.4638 23.3357 13.3229 18.3942 10.8418C12.3622 7.83371 5.80544 5.7697 0.533698 0.650183C0.446709 1.6733 0.368563 2.03803 0.36362 2.40378ZM23.1944 23.7834C11.6387 23.4809 4.80303 9.56065 5.02545 9.34416C16.3518 21.2034 20.7419 21.1896 23.1944 23.7834Z" fill="#3FA22C"/>
                </motion.svg>

        </div>
    )
}

export default EmonaIcon