import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareTwitter, faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Socials() {
	return (
		<div className='mCHSocials'>
			<div className='mCHSocial'>
				<a href='https://github.com/dazkona' target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faSquareGithub} size="2x" />
				</a>
			</div>
			<div className='mCHSocial'>
				<a href='https://twitter.com/dazkona' target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faSquareTwitter} size="2x" />
				</a>
			</div>
			<div className='mCHSocial'>
				<a href='https://www.linkedin.com/in/dazkona/' target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faLinkedin} size="2x" />
				</a>
			</div>
		</div>		
	);
}