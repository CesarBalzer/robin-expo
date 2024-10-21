import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

interface SkeletonLoaderProps {
	type: 'vehicle' | 'infraction';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({type}) => {
	switch (type) {
		case 'vehicle':
			return (
				<ContentLoader viewBox="0 0 500 350" height={225} width={500}>
					<Rect x="50" y="35" rx="10" ry="10" width="400" height="120" />
					<Rect x="30" y="170" rx="0" ry="0" width="440" height="20" />
					<Rect x="30" y="205" rx="10" ry="10" width="440" height="80" />
					<Rect x="30" y="310" rx="0" ry="0" width="440" height="20" />
				</ContentLoader>
			);
		case 'infraction':
			return (
				<ContentLoader viewBox="0 0 500 350" height={350} width={500}>
					<Rect x="3" y="5" rx="10" ry="10" width="300" height="35" />
					<Rect x="6" y="45" rx="0" ry="0" width="200" height="20" />

					<Rect x="3" y="100" rx="10" ry="10" width="300" height="35" />
					<Rect x="6" y="140" rx="0" ry="0" width="200" height="20" />

					<Rect x="3" y="190" rx="10" ry="10" width="300" height="35" />
					<Rect x="6" y="230" rx="0" ry="0" width="200" height="20" />

					<Rect x="6" y="300" rx="0" ry="0" width="200" height="20" />
				</ContentLoader>
			);
		default:
			return null;
	}
};

export default SkeletonLoader;
