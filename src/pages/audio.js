import { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '../styles/Audio.css'; // Import the CSS file
import { useRouter } from 'next/router';

const AudioPlayer = () => {
    const [audioData, setAudioData] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const audioRef = useRef(null);
    const modelRef = useRef(null); // To hold the loaded model
    const router = useRouter(); // Initialize router

    const handleAudioUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAudioData(file);
            setPrediction(null);
        }
    };

    const loadModel = async () => {
        modelRef.current = await tf.loadGraphModel('model/model.json');
    };

    const processAudioData = async (file) => {
        const audioBuffer = await decodeAudioFile(file);
        const features = extractFeatures(audioBuffer);
        return features;
    };

    const decodeAudioFile = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        return await audioContext.decodeAudioData(arrayBuffer);
    };

    const extractFeatures = (audioBuffer) => {
        const audioData = audioBuffer.getChannelData(0); // Get first channel data
        let tensor = tf.tensor(audioData).expandDims(0); // Expand dims to match model input

        const expectedLength = 384000;

        // Pad or truncate the tensor to the expected length
        if (tensor.shape[1] < expectedLength) {
            const padding = tf.zeros([1, expectedLength - tensor.shape[1]]);
            tensor = tensor.concat(padding, 1); // Concatenate the padding
        } else if (tensor.shape[1] > expectedLength) {
            tensor = tensor.slice([0, 0], [1, expectedLength]); // Truncate to expected length
        }

        // Add an extra dimension for the number of channels (1)
        tensor = tensor.expandDims(-1); // Now shape is [1, 384000, 1]

        return tensor;
    };

    const predictAudio = async (file) => {
        const features = await processAudioData(file);
        const result = await modelRef.current.predict(features);
        return result.dataSync(); // Return the prediction result
    };

    const handlePredict = async () => {
        if (audioData && modelRef.current) {
            const result = await predictAudio(audioData);
            const predictionValue = result[0]; // Assuming the result is a single value
            
            // Determine the condition based on the prediction value
            if (predictionValue < 0.5) {
                console.log("Healthy")
                setPrediction("Healthy");
            } else {
                console.log("COPD")
                setPrediction("COPD");
            }
        }
        router.push('/tinkermanSlide');
    };

    useEffect(() => {
        loadModel(); // Load the model when the component mounts

        return () => {
            if (audioData) {
                URL.revokeObjectURL(audioData);
            }
        };
    }, []);

    return (
        <div className="audio-player-container">
            <h1 className="audio-player-title">Audio Analysis</h1> {/* Added Title */}
            <label htmlFor="audio-upload" className="upload-button">Upload Audio</label>
            <input
                type="file"
                id="audio-upload"
                accept="audio/*"
                onChange={handleAudioUpload}
            />
            <audio className="audio-player" ref={audioRef} controls>
                {audioData && (
                    <source src={URL.createObjectURL(audioData)} type="audio/wav" />
                )}
                Your browser does not support the audio element.
            </audio>
            <button onClick={handlePredict} disabled={!audioData}>
                Predict
            </button>
            {prediction && <p>{prediction}</p>} {/* Display the prediction result */}
        </div>
    );
};

export default AudioPlayer;
