import { PresentationControls, Stage } from "@react-three/drei"
import Man from './man'
import Woman from './woman.js'
function Scene() {
    return (

        <PresentationControls speed={1.5} global polar={[-1, Math.PI / 4]} rotation={[Math.PI / 8, Math.PI / 4, 0]}>
            <Stage environment={"city"} intensity={0.1} contactShadow={false}>
                <Man />
            </Stage>
        </PresentationControls>
    );
}
export default Scene;