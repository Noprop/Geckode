"use client";
import { forwardRef, useEffect, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import StartGame from './game/main';
import { EventBus } from './game/EventBus';
const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene }, ref) {
    const gameRef = useRef(null);
    useImperativeHandle(ref, () => ({ game: gameRef.current, scene: undefined }), []);
    useLayoutEffect(() => {
        if (!gameRef.current) {
            gameRef.current = StartGame("game-container");
        }
        return () => {
            var _a;
            (_a = gameRef.current) === null || _a === void 0 ? void 0 : _a.destroy(true);
            gameRef.current = undefined;
        };
    }, []);
    useEffect(() => {
        const handler = (currentScene) => {
            currentActiveScene === null || currentActiveScene === void 0 ? void 0 : currentActiveScene(currentScene);
            ref.current.scene = currentScene;
        };
        EventBus.on('current-scene-ready', handler);
        return () => {
            EventBus.removeListener('current-scene-ready', handler);
        };
    }, [currentActiveScene, ref]);
    return <div id="game-container"/>;
});
export default PhaserGame;
