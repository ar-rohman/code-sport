<template>
    <div>
        <div class="flex justify-between">
            <div class="md:pr-10">
                <h1 class="font-bold text-xl mb-8">About</h1>
                <p>
                    <span class="font-bold text-sky-700">Code Sport</span>
                    provide about UEFA Champions League information, including matches, standing,
                    teams etc.
                </p>
                <p>
                    Data taken from
                    <a
                        class="text-sky-500 hover:text-sky-600 focus:text-sky-700"
                        href="https://www.football-data.org"
                        target="_blank"
                        rel="noopener"
                        >football-data.org</a
                    >
                </p>
                <p class="my-4">
                    Developed by
                    <a
                        class="text-sky-500 hover:text-sky-600 focus:text-sky-700"
                        href="https://github.com/ar-rohman"
                        target="_blank"
                        rel="noopener"
                        >Rohman</a
                    >
                </p>
                <p class="mb-4">Version {{ version }}</p>
                <p>Copyright &copy; 2020 - 2021</p>
            </div>
            <div class="hidden md:flex justify-start">
                <img
                    class="w-96"
                    src="../assets/images/football-player-Illustration.svg"
                    alt="football-player-Illustration" />
            </div>
        </div>
        <div class="hidden md:block fixed bottom-2">
            <a
                class="text-sky-500 hover:text-sky-600 focus:text-sky-700 text-xs"
                href="https://unblast.com/free-football-player-vector-illustration-ai"
                target="_blank"
                rel="noopener"
                >Illustration source
            </a>
        </div>
    </div>
</template>

<script>
import { version } from '../../package.json';
export default {
    name: 'AboutPage',
    data() {
        return {
            version,
        };
    },
};
</script>
