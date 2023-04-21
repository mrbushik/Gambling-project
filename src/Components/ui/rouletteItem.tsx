import React, {useEffect,useState,useRef} from 'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import getRandomIntInRange from "../common/utils/getRandomIntInRange";
    const prizes = [
        {
            image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
            text: '0'
        },
        {
            image: 'https://i.ibb.co/T1M05LR/good-2.png',
            text: '1'

        },
        {
            image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
            text: '2'

        },
        {
            image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
            text: '3'

        },
        {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '4'

        },
        {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '5'

        },
        {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '6'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '7'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '8'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '9'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '10'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '11'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '12'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '13'

        },  {
            image: 'https://i.ibb.co/64k8D1c/good-5.png',
            text: '14'

        },

    ];

const winPrizeIndex = 0;

const reproductionArray = (array:any = [], length = 0) => [
    ...Array(length)
        .fill('_')
        .map(() => array[Math.floor(Math.random() * array.length)]),
];
//TODO rewrite this
const reproducedPrizeList = [
    ...prizes,
    ...prizes,
    ...prizes,
    // ...reproductionArray(prizes, prizes.length * 3),
    ...prizes,
    ...prizes,
    ...prizes,
    // ...reproductionArray(prizes, prizes.length),
];

const generateId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

const prizeList = reproducedPrizeList.map((prize) => ({
    ...prize,
    id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
}));
const API = {
    getPrizeIndex: async () => {
        const randomPrizeIndex = getRandomIntInRange(0, prizes.length - 1);
        const randomPrizeIndexOffset = prizes.length * 4;
        return randomPrizeIndex + randomPrizeIndexOffset;
    },
};

const RouletteItem = () => {
    //TODO prize object type
    const [prizeList, setPrizeList] = useState<any>([]);
    const [start, setStart] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState(0);


    useEffect(() => {
        setPrizeList(reproducedPrizeList);
    }, []);


    useEffect(() => {
        if (!prizeIndex || start) {
            return;
        }

        setStart(true);
    }, [prizeIndex, start]);

    useEffect(() => {
        if (!spinning || !prizeList.length) {
            return;
        }

        const prepare = async () => {
            const newPrizeIndex = await API.getPrizeIndex();
            setPrizeIndex(newPrizeIndex);
            setStart(false);

            const { id } = prizeList[newPrizeIndex];
            console.log(`Must win id - ${id}`)
        };

        prepare();
    }, [spinning, prizeList]);


    const handleStart = () => setSpinning(true);

    const handlePrizeDefined = () => {
        console.log('🥳 Prize defined! 🥳');
        setSpinning(false);

    };


        return (
            <>
                <RoulettePro
                    prizes={prizeList}
                    prizeIndex={prizeIndex}
                    start={start}
                    onPrizeDefined={handlePrizeDefined}
                    defaultDesignOptions={{ prizesWithText: true }}
                    options={{ withoutAnimation: true, stopInCenter: false,  }}
                />
                <button onClick={handleStart}>Start</button>
            </>
    );
};


export default RouletteItem;