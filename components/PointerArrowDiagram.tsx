import React from "react";
import { Svg, G, Image, Path, Defs } from "react-native-svg";

const PointerArrowDiagram: React.FC = () => (
	<Svg viewBox="-0.5 -0.5 342 296" width="342" height="296">
		<Defs />
		<G>
			<G data-cell-id="0">
				<G data-cell-id="1">
					<G data-cell-id="Y7uu3U6yIfqLu1zLHUTI-4">
						<G>
							<Image
								x={-0.5}
								y={5.02}
								width={201.1}
								height={146.3}
								href="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pointing_hand_cursor_vector.svg/1280px-Pointing_hand_cursor_vector.svg.png"
								preserveAspectRatio="none"
							/>
						</G>
					</G>
				</G>
			</G>
			<G data-cell-id="Y7uu3U6yIfqLu1zLHUTI-11">
				<G>
					<Image
						x={120.5}
						y={120.32}
						width={201.1}
						height={146.3}
						href="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pointing_hand_cursor_vector.svg/1280px-Pointing_hand_cursor_vector.svg.png"
						preserveAspectRatio="none"
					/>
				</G>
			</G>
			<G data-cell-id="Y7uu3U6yIfqLu1zLHUTI-13">
				<G>
					<Path
						d="M 100.55 1.52 Q 240.6 1.5 240.55 133.98"
						fill="none"
						stroke="rgb(255, 255, 255)"
						strokeWidth={5}
						strokeMiterlimit={10}
					/>
					<Path
						d="M 240.55 142.23 L 235.06 131.23 L 240.55 133.98 L 246.06 131.23 Z"
						fill="rgb(0, 0, 0)"
						stroke="rgb(255, 255, 255)"
						strokeWidth={5}
						strokeMiterlimit={10}
					/>
				</G>
			</G>
		</G>
	</Svg>
);

export default PointerArrowDiagram;
