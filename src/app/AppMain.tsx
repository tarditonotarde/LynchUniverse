import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentRow } from './components/ContentRow';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { ProfileSelection } from './components/ProfileSelection';
import { Video } from './components/VideoCard';
import { AnimatePresence, motion } from 'motion/react';
import { AudioProvider, useAudio } from './contexts/AudioContext';
import { useFavorites } from './contexts/FavoritesContext';

export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

function AppContent() {
  const [showProfileSelection, setShowProfileSelection] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { stop } = useAudio();

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleLogoClick = () => {
    console.log('Stopping music...');
    stop();
    setShowProfileSelection(true);
    setShowSplash(false);
  };

  const handleProfileSelect = (profileId: string) => {
    if (profileId === 'lynch') {
      setShowProfileSelection(false);
      setShowSplash(true);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showProfileSelection ? (
        <ProfileSelection
          key="profile-selection"
          onSelectProfile={handleProfileSelect}
        />
      ) : showSplash ? (
        <SplashScreen
          key="splash"
          profile="conspiranoia"
          onComplete={() => setShowSplash(false)}
        />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ConspiranoiaApp 
            onVideoClick={handleVideoClick}
            handleCloseModal={handleCloseModal}
            selectedVideo={selectedVideo}
            isModalOpen={isModalOpen}
            activeCategory={activeCategory}
            handleCategoryChange={handleCategoryChange}
            handleLogoClick={handleLogoClick}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// CONSPIRANOIA+ Component
function ConspiranoiaApp({ 
  onVideoClick, 
  handleCloseModal, 
  selectedVideo, 
  isModalOpen,
  activeCategory,
  handleCategoryChange,
  handleLogoClick
}: any) {
  // Twin Peaks videos
  const twinPeaksVideos: Video[] = [
    {
      id: 'df1',
      title: 'Eraserhead (1977)',
      thumbnail: 'https://images.mubicdn.net/images/artworks/614368/cache-614368-1688059961/images-original.png',
      duration: 'Official Trailer',
      description: 'In a desolate industrial wasteland, Henry Spencer navigates a nightmarish existence filled with bizarre encounters and unspeakable terrors. When his girlfriend Mary X gives birth to a grotesque, perpetually screaming mutant child, Henry\'s fragile grasp on reality begins to crumble. Shot over five years with meticulous attention to every disturbing detail, this surrealist body horror masterpiece launched David Lynch\'s career and remains one of cinema\'s most unnerving fever dreams. A haunting meditation on anxiety, parenthood, and urban decay.',
      tags: ['Surreal Horror', 'Experimental', 'Body Horror'],
      youtubeId: 'Wp3Qcp11X2U',
    },
    {
      id: 'df2',
      title: 'The Elephant Man (1980)',
      thumbnail: 'https://images.mubicdn.net/images/film/1358/cache-8792-1745489526/image-w1280.jpg?size=800x',
      duration: 'Official Trailer',
      description: 'Victorian London, 1884: Dr. Frederick Treves discovers John Merrick, a severely disfigured man exhibited as a carnival curiosity and brutally mistreated by society. Rescued from his tormentors, Merrick reveals himself to be a gentle, intelligent soul trapped in a body that horrifies all who see him. Shot in luminous black and white, Lynch\'s most accessible film is a profoundly moving exploration of human dignity, compassion, and the true meaning of monstrosity. A haunting portrait of beauty found in the most unexpected places.',
      tags: ['Drama', 'Biography', 'Historical'],
      youtubeId: 'AF9gNKJi79g',
    },
    {
      id: 'df3',
      title: 'Dune (1984)',
      thumbnail: 'https://assets.mubicdn.net/images/film/3378/image-w1280.jpg?1745490323',
      duration: 'Official Trailer',
      description: 'In the distant future, noble houses battle for control of Arrakis, the desert planet that produces the universe\'s most valuable substance: the spice melange. Young Paul Atreides must navigate a treacherous web of politics, prophecy, and betrayal to claim his destiny as the prophesied messiah of the desert people. Lynch\'s ambitious adaptation of Frank Herbert\'s epic novel is a visually stunning fever dream of baroque production design and nightmarish imagery. Though troubled in its theatrical release, it remains a fascinating, deeply personal vision of science fiction as medieval opera.',
      tags: ['Sci-Fi', 'Epic', 'Adaptation'],
      youtubeId: 'sJ9VAJ1f0zU',
    },
    {
      id: 'df4',
      title: 'Blue Velvet (1986)',
      thumbnail: 'https://images.mubicdn.net/images/artworks/846116/cache-846116-1753726646/images-original.png',
      duration: 'Official Trailer',
      description: 'When college student Jeffrey Beaumont discovers a severed human ear in a field near his idyllic hometown, he\'s drawn into a shadowy underworld of sexual obsession, violence, and depravity. His amateur investigation leads him to Dorothy Vallens, a torch singer held captive by the psychotic Frank Booth, whose terrifying presence shatters the veneer of small-town American innocence. Lynch\'s breakthrough masterpiece peels back the white picket fences to reveal the darkness festering beneath, creating a hypnotic neo-noir that redefined what American cinema could be.',
      tags: ['Neo-Noir', 'Mystery', 'Psychological'],
      youtubeId: 'rAA6imfqMYQ',
    },
    {
      id: 'df5',
      title: 'Wild at Heart (1990)',
      thumbnail: 'https://assets.mubicdn.net/images/film/2227/image-w1280.jpg?1745490856',
      duration: 'Official Trailer',
      description: 'Sailor Ripley and Lula Fortune are young lovers on the run, racing across a hallucinogenic American landscape to escape Lula\'s unhinged mother and the army of grotesque assassins she\'s hired to eliminate Sailor. Part road movie, part twisted fairy tale, this Palme d\'Or winner explodes with volcanic passion, shocking violence, and moments of unexpected tenderness. Lynch transforms the open highway into a fever dream populated by some of cinema\'s most memorably bizarre characters, all while Elvis croons and the yellow brick road beckons.',
      tags: ['Romance', 'Crime', 'Road Movie'],
      youtubeId: 'QCQwumNQL9E',
    },
    {
      id: 'df6',
      title: 'Twin Peaks: Fire Walk with Me (1992)',
      thumbnail: 'https://assets.mubicdn.net/images/film/2270/image-w856.jpg?1745491059',
      duration: 'Official Trailer',
      description: 'The final seven days of Laura Palmer\'s life unfold in agonizing detail, revealing the full horror of her secret existence in the seemingly peaceful town of Twin Peaks. What the television series could only hint at, Lynch shows with unflinching intensity: Laura\'s descent into a nightmare world of abuse, drugs, and supernatural evil. Initially rejected by fans expecting television comfort, this devastating prequel has been reclaimed as Lynch\'s most emotionally raw and uncompromising work—a harrowing portrait of trauma and the loss of innocence that cuts deeper than any horror film.',
      tags: ['Mystery', 'Psychological Horror', 'Twin Peaks'],
      youtubeId: 'GJdH09lo3DM',
    },
    {
      id: 'df7',
      title: 'Lost Highway (1997)',
      thumbnail: 'https://images.mubicdn.net/images/film/101/cache-48377-1745490982/image-w1280.jpg?size=800x',
      duration: 'Official Trailer',
      description: 'Reality fractures and reforms in this mind-bending neo-noir about jazz musician Fred Madison, who receives mysterious videotapes of his house before being convicted of his wife\'s brutal murder. In prison, he inexplicably transforms into young mechanic Pete Dayton, who becomes entangled with gangster\'s moll Alice Wakefield—who may or may not be Fred\'s dead wife. Lynch and co-writer Barry Gifford construct a möbius strip narrative that defies linear logic, creating a nightmarish meditation on jealousy, identity, and the stories we tell ourselves to escape unbearable truths.',
      tags: ['Neo-Noir', 'Psychological Thriller', 'Mystery'],
      youtubeId: 'hwNm8_L0DQk',
    },
    {
      id: 'df8',
      title: 'The Straight Story (1999)',
      thumbnail: 'https://play-lh.googleusercontent.com/proxy/On3oobnNaov6yZF7SmC3UdWvKfEKddnaZegv2YgvVRvlFcfoO9Uo7aaD6c529doJSS8NOfIGELDmsQEcWg-Wm_k9M_ODMV_oH91IRVUP-WILSk9tDQ=s1920-w1920-h1080',
      duration: 'Official Trailer',
      description: 'Based on the true story of Alvin Straight, a 73-year-old man who drove a riding lawnmower 240 miles across Iowa and Wisconsin to reconcile with his estranged, dying brother. Lynch\'s most unconventional film is also his most conventional—a gentle, deeply humanistic road movie that finds profound beauty in simplicity and the American heartland. Shot in warm, sun-dappled tones and anchored by Richard Farnsworth\'s magnificent performance, this meditation on aging, regret, and redemption proves that Lynch\'s vision encompasses not just darkness, but light.',
      tags: ['Drama', 'Road Movie', 'Family'],
      youtubeId: 'lcMyFckt_Hs',
    },
    {
      id: 'df9',
      title: 'Mulholland Drive (2001)',
      thumbnail: 'https://images.mubicdn.net/images/film/187/cache-51170-1745491092/image-w1280.jpg?size=800x',
      duration: 'Official Trailer',
      description: 'After a car accident on the winding Mulholland Drive leaves a woman with amnesia, she and aspiring actress Betty Elms attempt to uncover her identity, plunging into the seductive and sinister world of Los Angeles. But reality proves unstable, and the mystery deepens into a labyrinthine nightmare where dreams, desires, and despair become indistinguishable. Originally conceived as a television pilot, Lynch transformed the rejected project into his masterpiece—a devastating critique of Hollywood\'s dream factory and an emotionally shattering meditation on love, loss, and the price of illusion.',
      tags: ['Mystery', 'Psychological Thriller', 'Surreal'],
      youtubeId: 'jbZJ487oJlY',
    },
    {
      id: 'df10',
      title: 'Inland Empire (2006)',
      thumbnail: 'https://assets.mubicdn.net/images/film/102/image-w856.jpg?1745489493',
      duration: 'Official Trailer',
      description: 'Actress Nikki Grace lands the role of a lifetime, only to discover that the film is a remake of an unfinished Polish production allegedly cursed by a brutal murder. As she disappears into her character, the boundaries between her life, the role, and a mysterious parallel narrative dissolve into a three-hour odyssey through fractured realities and nightmarish Hollywood back-alleys. Shot on consumer-grade digital video and assembled with dream logic, Lynch\'s most experimental feature film is a hallucinogenic descent into the darkest corners of performance, identity, and consciousness itself.',
      tags: ['Experimental', 'Mystery', 'Psychological'],
      youtubeId: 'kS2v-icgBj4',
    },
  ];

  // Films videos
  const filmsVideos: Video[] = [
    {
      id: 'ms1',
      title: 'Twin Peaks (1990)',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BOGIwZmYzYTAtMWYyMi00ODdhLTliYzgtMjVlZDIxMDMyYzc1XkEyXkFqcGc@._V1_.jpg',
      duration: 'Official Trailer Season 1',
      description: 'FBI Special Agent Dale Cooper arrives in the small logging town of Twin Peaks to investigate the brutal murder of beloved high school student Laura Palmer. What begins as a conventional murder mystery quickly spirals into something far stranger, as Cooper encounters a town populated by eccentric characters harboring dark secrets, prophetic dreams, and supernatural forces lurking in the surrounding woods. Lynch and Mark Frost created a cultural phenomenon that revolutionized television, blending soap opera melodrama with surrealist horror and existential mystery.',
      tags: ['Mystery', 'Drama', 'Surreal'],
      youtubeId: 'rFuKtJjhBCQ',
    },
    {
      id: 'ms2',
      title: 'Twin Peaks (1991)',
      thumbnail: 'https://thehousethatcinemabuiled.wordpress.com/wp-content/uploads/2016/10/def6cdbe6f813037b1d923a24c9a4121.jpg',
      duration: 'Official Trailer Season 2',
      description: 'The investigation continues as Agent Cooper delves deeper into Twin Peaks\' interconnected web of mysteries, uncovering the existence of the Black Lodge—a realm of pure evil that exists alongside our world. As Laura Palmer\'s killer is revealed, the show ventures into increasingly surreal and metaphysical territory, culminating in one of television\'s most shocking and enigmatic cliffhangers. The second season pushes the boundaries of network television, transforming a murder mystery into a cosmic battle between good and evil.',
      tags: ['Mystery', 'Drama', 'Black Lodge'],
      youtubeId: '3IxZ6KkREg8',
    },
    {
      id: 'ms3',
      title: 'On the Air (1992)',
      thumbnail: 'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2014/01/05/3b0dd0f_On_The_Air__logo_.jpg',
      duration: 'Series',
      description: 'Set in 1957, this short-lived sitcom follows the catastrophic production of "The Lester Guy Show," a live television variety program plagued by technical disasters, bizarre accidents, and the Kafkaesque incompetence of the Zoblotnick Broadcasting Corporation. Lynch brings his signature surrealism to the sitcom format, creating a nostalgic yet nightmarish vision of early television\'s golden age. Though canceled after only three episodes, it remains a fascinatingly odd experiment in applying Lynchian aesthetics to straightforward comedy.',
      tags: ['Comedy', 'Satire', 'Vintage TV'],
      youtubeId: 'TAdFHwGlAQQ',
    },
    {
      id: 'ms4',
      title: 'Hotel Room (1993)',
      thumbnail: 'https://assets.mubicdn.net/images/film/41458/image-w856.jpg?1745490329',
      duration: 'Miniseries',
      description: 'Room 603 of the Railroad Hotel serves as the stage for three separate dramas spanning decades, each revealing the private anguish of strangers who temporarily inhabit this unremarkable space. Lynch directs two of the three episodes, transforming a simple hotel room into a confessional booth where secrets are revealed, relationships implode, and the human capacity for cruelty and tenderness collide. This HBO anthology series showcases Lynch\'s ability to find profound psychological complexity in minimal settings and intimate encounters.',
      tags: ['Anthology', 'Drama', 'Psychological'],
      youtubeId: 'GBlbp84mc3s',
    },
    {
      id: 'ms5',
      title: 'Rabbits (2002)',
      thumbnail: 'https://images.mubicdn.net/images/film/40249/cache-30408-1745490292/image-w1280.jpg',
      duration: 'Web Series',
      description: 'In a surreal sitcom nightmare, three human-sized rabbits inhabit a dingy apartment where they speak in non-sequiturs, accompanied by ominous drones and inexplicable laugh tracks. Time seems broken, conversations make no linear sense, and an atmosphere of creeping dread pervades every stilted exchange. Originally presented as a web series, this deeply unsettling experiment later became integral to Inland Empire. Rabbits strips the sitcom format to its uncanny essence, revealing the existential horror lurking beneath television\'s manufactured comfort.',
      tags: ['Experimental', 'Surreal', 'Web Series'],
      youtubeId: 'drjQfQtv2BQ',
    },
    {
      id: 'ms6',
      title: 'DumbLand (2002)',
      thumbnail: 'https://images.mubicdn.net/images/artworks/350131/cache-350131-1627591788/images-original.png',
      duration: 'Web Series',
      description: 'Crudely animated with the aesthetic of a child\'s drawing, this web series follows a dysfunctional family trapped in a bizarre, filthy neighborhood where violence, stupidity, and grotesque bodily functions reign supreme. Lynch embraces primitive digital animation to create a darkly comic fever dream that feels like a demented collision between underground comics and outsider art. Each short episode revels in absurdist cruelty and scatological humor, presenting a vision of American family life as nightmare cartoon.',
      tags: ['Animation', 'Dark Comedy', 'Experimental'],
      youtubeId: '6T6DGyo8NuY',
    },
    {
      id: 'ms7',
      title: 'Twin Peaks: The Missing Pieces (2014)',
      thumbnail: 'https://timelessfilmfestival.pl/wp-content/uploads/2025/03/Twin-Peaks_-The-Missing-Pieces_GLOWNY.jpg',
      duration: 'Limited Series',
      description: 'Ninety minutes of deleted and extended scenes from Fire Walk with Me, assembled into a haunting companion piece that deepens and expands Laura Palmer\'s final days. These "missing pieces" include crucial character moments, alternative perspectives on familiar scenes, and entirely new sequences that illuminate the mythology of Twin Peaks. More than mere deleted scenes, this collection functions as an essential text that bridges the original series, Fire Walk with Me, and The Return, revealing connections that span decades.',
      tags: ['Twin Peaks', 'Extended Scenes', 'Mystery'],
      youtubeId: 'MQwkkRWOry0',
    },
    {
      id: 'ms8',
      title: 'Twin Peaks: The Return (2017)',
      thumbnail: 'https://i.guim.co.uk/img/media/ed4a9b511be8ddda2474a50e56f787e9c3d6a09f/0_0_3600_2400/master/3600.jpg?width=700&quality=85&auto=format&fit=max&s=671ee79dd839e50858dabfc32fb4cc57',
      duration: 'Official Trailer Season 3',
      description: 'Twenty-five years after the Black Lodge claimed him, Agent Cooper\'s doppelgänger walks the earth spreading evil while the real Cooper remains trapped between worlds. This 18-hour Showtime limited series represents Lynch operating at the peak of his creative freedom, constructing a meditation on time, trauma, nuclear horror, and the erosion of American innocence. Equal parts crime procedural, metaphysical epic, and avant-garde art film, The Return demolishes conventional television storytelling to create something unprecedented—a masterwork that rewards patience with transcendence.',
      tags: ['Twin Peaks', 'Surreal', 'Revival'],
      youtubeId: 'BWVr67uvu4o',
    },
    {
      id: 'ms9',
      title: 'TWIN PEAKS: A Limited Event Series (2017)',
      thumbnail: 'https://static.filmin.es/images/es/article/10967/1/post_0_3_637x307.webp',
      duration: 'Limited Series',
      description: 'The complete 18-episode limited event series that brought Twin Peaks back to television after a 25-year absence, fulfilling the prophecy that "the owls are not what they seem" and Agent Cooper would return. This is Lynch uncompromised, given complete creative control to craft a sweeping narrative that spans multiple timelines, dimensions, and states of consciousness. More than a revival, it\'s a profound meditation on nostalgia, loss, and the impossibility of returning home, cementing Twin Peaks as one of the most important artistic achievements in television history.',
      tags: ['Twin Peaks', 'Limited Series', 'Masterpiece'],
      youtubeId: 'yv3YidkMbNQ',
    },
  ];

  // Mulholland Drive videos
  const mulhollandDriveVideos: Video[] = [
    {
      id: 'sf1',
      title: 'Six Men Getting Sick (Six Times) (1966)',
      thumbnail: 'https://assets.mubicdn.net/images/film/29136/image-w1280.jpg?1745491904',
      duration: '4 min',
      description: 'David Lynch\'s very first film, created as a student at the Pennsylvania Academy of Fine Arts, is a one-minute loop of animated paintings depicting men in various stages of illness and bodily distress. Projected onto a sculpted screen with an integrated soundtrack of industrial drones and human groans, this proto-Lynchian experiment already contains the seeds of his obsession with bodily horror, industrial soundscapes, and the transformation of painting into moving image. Endlessly repeated, the cycle of sickness becomes hypnotic and strangely beautiful.',
      tags: ['Experimental', 'Animation', 'Debut'],
      youtubeId: 'tpigVI4pMXA',
    },
    {
      id: 'sf2',
      title: 'Sailing with Bushnell Keeler (1967)',
      thumbnail: 'https://assets.mubicdn.net/images/film/253050/image-w1280.jpg?1745496659',
      duration: '6 min',
      description: 'A commissioned documentary about sculptor Bushnell Keeler and his passion for sailing, this early work finds Lynch exploring someone else\'s creative obsession. Shot with simple observational techniques and featuring Keeler discussing his boats and artistic philosophy, it\'s a fascinating anomaly in Lynch\'s filmography—straightforward, educational, and utterly devoid of his later darkness. Yet even here, Lynch\'s attention to texture, sound, and the relationship between art and craftsmanship hints at the meticulous filmmaker he would become.',
      tags: ['Documentary', 'Short', 'Nautical'],
      youtubeId: '9HPn1jJs7J0',
    },
    {
      id: 'sf3',
      title: 'Absurd Encounter with Fear (1967)',
      thumbnail: 'https://i.ytimg.com/vi/qDqN9-VD9dM/maxresdefault.jpg',
      duration: '8 min',
      description: 'An experimental student film exploring anxiety through distorted images, disorienting sound design, and abstract visual metaphors. Lynch uses double exposure, grainy film stock, and jarring editing to create a tactile representation of psychological terror. Though primitive by his later standards, this brief nightmare already demonstrates his gift for conjuring dread through atmosphere and sonic texture rather than conventional narrative. The fear it depicts isn\'t rational or explainable—it simply exists, pervasive and inescapable.',
      tags: ['Experimental', 'Surreal', 'Psychological'],
      youtubeId: 'qRibj5S-F6A',
    },
    {
      id: 'sf4',
      title: 'Fictitious Anacin Commercial (1967)',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BMmY3N2RhNzktMmU0OS00ZTMxLWExNmUtNzFlNWJiYWU4M2JhXkEyXkFqcGc@._V1_.jpg',
      duration: '1 min',
      description: 'A student project assignment to create a commercial for Anacin pain reliever becomes, in Lynch\'s hands, a surrealist nightmare of pounding headaches visualized as industrial machinery invading the human skull. Rather than offering relief, the ad amplifies the agony, transforming consumer advertising into body horror. It\'s a brief but crucial early work that reveals Lynch\'s instinct to subvert commercial forms and find the disturbing beneath the mundane—a tendency that would define his entire career.',
      tags: ['Commercial', 'Surreal', 'Short'],
      youtubeId: 'il6VrvOpn1o',
    },
    {
      id: 'sf5',
      title: 'The Alphabet (1968)',
      thumbnail: 'https://noescinetodoloquereluce.com/wp-content/uploads/2022/05/El_alfabeto_The_Alphabet.jpg',
      duration: '4 min',
      description: 'Inspired by a nightmare experienced by Lynch\'s wife, this nightmarish four-minute film transforms the childhood process of learning the alphabet into a terrifying ordeal. A pale girl lies on a bed, reciting letters that seem to assault her consciousness while animated sequences and disturbing imagery cascade across the screen. Lynch\'s fusion of live-action and animation, coupled with his signature industrial sound design, creates a visceral portrait of education as trauma—indoctrination into language and society as a kind of violation.',
      tags: ['Experimental', 'Animation', 'Nightmare'],
      youtubeId: 'Ac1pAW9UN0Q',
    },
    {
      id: 'sf6',
      title: 'The Grandmother (1970)',
      thumbnail: 'https://assets.mubicdn.net/images/film/2544/image-w1280.jpg?1745489554',
      duration: '34 min',
      description: 'A young boy, tormented by his brutish, animalistic parents in a bleak industrial home, plants a seed that grows into a loving grandmother who offers him the only tenderness he has ever known. Lynch\'s breakthrough as a narrative filmmaker fuses his experimental aesthetic with genuine emotional power, creating a dark fairy tale about the need for love and the possibility of escape. The 34-minute film won critical acclaim and grants, directly leading to the funding of Eraserhead and launching Lynch\'s career.',
      tags: ['Experimental', 'Dark Fantasy', 'Surreal'],
      youtubeId: 'bFXT6F-4_ec',
    },
    {
      id: 'sf7',
      title: 'The Cowboy and the Frenchman (1988)',
      thumbnail: 'https://assets.mubicdn.net/images/film/40981/image-w856.jpg?1745492373',
      duration: '26 min',
      description: 'Commissioned as part of French television\'s "The French as Seen By..." anthology, Lynch delivers an absurdist comedy Western about a Wyoming rancher who discovers a mysterious Frenchman on his property. Cultural stereotypes collide in deliriously surreal fashion as the cowboy and his ranch hands grapple with French cuisine, fashion, and philosophy. Lighter than Lynch\'s typical work but no less strange, this rare comedy showcases his playful side while maintaining his gift for the bizarre and the inexplicable.',
      tags: ['Comedy', 'Western', 'Short Film'],
      youtubeId: 'c8MKPpjOjFs',
    },
    {
      id: 'sf8',
      title: 'The Disc of Sorrow is Installed (2002)',
      thumbnail: 'https://assets.mubicdn.net/images/film/435332/image-w856.jpg?1745503553',
      duration: '10 min',
      description: 'A digital art piece born from Lynch\'s experiments with early consumer video cameras, this abstract work layers distorted imagery, grinding electronic sounds, and cryptic spoken fragments into a hallucinatory meditation on technology and consciousness. Created during the period when Lynch was embracing digital video for the first time, it feels like peering into the corrupted data stream of a nightmare. The "disc of sorrow" might be technology itself, or perhaps the human mind attempting to process the digital age.',
      tags: ['Experimental', 'Abstract', 'Digital'],
      youtubeId: '4-9p4Qofdnc',
    },
    {
      id: 'sf9',
      title: 'Blue Green (2007)',
      thumbnail: 'https://assets.mubicdn.net/images/film/133942/image-w856.jpg?1745492613',
      duration: '3 min',
      description: 'A brief visual poem that distills Lynch\'s aesthetic to its purest essence: color, texture, light, and sound merging into something between cinema and painting. Abstract blue and green hues bleed and shift across the frame while droning tones create an immersive sonic environment. Created for an art exhibition, this three-minute meditation demonstrates Lynch\'s continued fascination with the sensory possibilities of moving image, divorced from narrative or even recognizable imagery—pure cinema as emotional atmosphere.',
      tags: ['Experimental', 'Visual Art', 'Abstract'],
      youtubeId: 'hbXLLG-L09I',
    },
    {
      id: 'sf10',
      title: 'Absurda (2007)',
      thumbnail: 'https://i.ytimg.com/vi/ggvZ7HdG7hk/maxresdefault.jpg',
      duration: '7 min',
      description: 'A digital video collage that embraces chaos and the irrational, layering distorted faces, cryptic dialogue fragments, and stuttering imagery into a dense, disorienting experience. Lynch recorded and manipulated digital video until reality itself seems to glitch and fracture, creating a portrait of consciousness under siege. The title perfectly encapsulates Lynch\'s fascination with the absurd—not as comedy, but as a fundamental condition of existence, the incomprehensible strangeness that lurks just beneath the everyday.',
      tags: ['Experimental', 'Absurd', 'Surreal'],
      youtubeId: 'ggvZ7HdG7hk',
    },
    {
      id: 'sf11',
      title: 'Bug Crawls (2008)',
      thumbnail: 'https://images.mubicdn.net/images/artworks/374350/cache-374350-1631294189/images-original.png',
      duration: '3 min',
      description: 'An extreme close-up observation of insects crawling across surfaces, filmed with Lynch\'s signature attention to texture and unsettling detail. What could be a simple nature documentary becomes something more disturbing in Lynch\'s hands—the alien quality of insect life magnified until these tiny creatures seem monstrous, their movements both fascinating and repulsive. It\'s a miniature meditation on the strangeness of life itself, the uncanny in the microscopic, and the thin line between observation and horror.',
      tags: ['Experimental', 'Nature', 'Abstract'],
      youtubeId: '5fvejLDSZYQ',
    },
    {
      id: 'sf12',
      title: 'Lady Blue Shanghai (2010)',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BNmVhNWM1NWQtOWQ0Ny00YzcwLTkwZmItYWFjZGQ2M2JhY2RiXkEyXkFqcGc@._V1_.jpg',
      duration: '16 min',
      description: 'Commissioned as a fashion film by Dior, Lynch transforms commercial luxury imagery into a neo-noir mystery set in the neon-lit streets of Shanghai. Marion Cotillard stars as a mysterious woman pursued through the city\'s nighttime underworld, her elegant Dior wardrobe contrasting with the seedy locations and ominous atmosphere. Lynch brings his signature obsession with secrets, danger, and feminine mystique to the world of high fashion, creating something that functions simultaneously as advertising and art—glamorous, menacing, and utterly hypnotic.',
      tags: ['Mystery', 'Fashion Film', 'Shanghai'],
      youtubeId: 'Q8K6HcbubTw',
    },
    {
      id: 'sf13',
      title: 'The 3 Rs (2011)',
      thumbnail: 'https://i.ytimg.com/vi/KIPQKiDzQi0/maxresdefault.jpg',
      duration: '5 min',
      description: 'What begins as a cheerful animated public service announcement about recycling—Reduce, Reuse, Recycle—quickly transforms into something far stranger and darker. Lynch\'s crude digital animation style gives the environmental message an unsettling quality, and as the film progresses, the tone shifts from educational to nightmarish. Even in a PSA commissioned for a green initiative, Lynch cannot resist subverting expectations, finding the uncanny in the mundane act of teaching children about environmental responsibility.',
      tags: ['Animation', 'PSA', 'Environmental'],
      youtubeId: 'KIPQKiDzQi0',
    },
    {
      id: 'sf14',
      title: 'I Touch a Red Button Man (2011)',
      thumbnail: 'https://m.blog.hu/re/recorder/image/REC-2011-07/lynch-red1.jpg',
      duration: '10 min',
      description: 'A man becomes fixated on a mysterious red button, and Lynch transforms this simple premise into an obsessive psychological descent. Shot with grainy digital video and accompanied by droning industrial sounds, the film explores compulsion, curiosity, and the magnetic pull of the forbidden. The red button becomes a Lynchian symbol—something that promises revelation or transformation but may only lead to annihilation. It\'s a parable about temptation, desire, and the human inability to leave mysteries alone.',
      tags: ['Experimental', 'Obsession', 'Mystery'],
      youtubeId: 'vcCSNsW-LBs',
    },
    {
      id: 'sf15',
      title: 'Memory Film (2012)',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BMmZlOTNlYmMtNWNhMy00Y2ZlLWE2YmUtMGQ1ZWQ3NjUzYTgyXkEyXkFqcGc@._V1_.jpg',
      duration: '8 min',
      description: 'A fragmentary exploration of how memory functions—or fails to function—assembled from disjointed images, repeated motifs, and sonic textures that evoke both nostalgia and dread. Lynch presents memory not as coherent narrative but as sensory impressions that resist linear organization. Images recur, shift, dissolve; sounds loop and layer. The result is a portrait of consciousness as inherently unreliable, memory as reconstruction rather than recording, and the past as something forever lost and yet perpetually haunting the present.',
      tags: ['Experimental', 'Memory', 'Abstract'],
      youtubeId: 'mtl4lo_hjP0',
    },
    {
      id: 'sf16',
      title: 'Idem Paris (2013)',
      thumbnail: 'https://cdn.theplaylist.net/wp-content/uploads/2013/02/15082447/david-lynch-at-idem-paris-2011-2012-11-22-002-920x690.jpg',
      duration: '13 min',
      description: 'Another fashion film, this time set in Paris and featuring model Daria Strokous wandering through the city\'s elegant spaces and shadowy corners. Lynch shoots Paris not as romantic cliché but as a dreamscape of luxury and menace, where beauty and danger coexist. The fashion becomes costume in a mysterious narrative that never quite reveals its plot—is she fleeing something? Searching for something? Lynch transforms runway aesthetics into cinema of pure mood and suggestion.',
      tags: ['Fashion Film', 'Paris', 'Surreal'],
      youtubeId: 'V_VKCjeMzhg',
    },
    {
      id: 'sf17',
      title: 'What Did Jack Do? (2017)',
      thumbnail: 'https://i.guim.co.uk/img/media/d11998b8554b2d222bde6fd1ca78d7cbcd9746d8/46_52_1645_987/master/1645.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=cfac90c99e42b3eb3666a331927439e6',
      duration: '17 min',
      description: 'In a nearly empty train station, a hard-boiled detective interrogates Jack Cruz—a capuchin monkey in a suit—about a violent crime involving a love triangle and a chicken named Toototabon. Shot in stark black-and-white with Lynch himself playing the detective, this surrealist noir parody is simultaneously hilarious and unsettling. The monkey\'s voice (also Lynch) delivers hardboiled dialogue with perfect deadpan conviction, creating an absurdist masterpiece that Netflix released as a surprise drop, cementing Lynch\'s status as a filmmaker who can make literally anything.',
      tags: ['Comedy', 'Noir', 'Talking Monkey'],
      youtubeId: 'I7GTWOC_yh8',
    },
    {
      id: 'sf18',
      title: 'Ant Head (2018)',
      thumbnail: 'https://images.mubicdn.net/images/film/222245/cache-390960-1745495564/image-w1280.jpg?size=800x',
      duration: '5 min',
      description: 'An extreme close-up study of ants moving across surfaces, their alien anatomy magnified until they become genuinely unsettling. Lynch observes their mechanical precision, their relentless collective purpose, finding in their behavior something both fascinating and nightmarish. Like Bug Crawls, this brief film demonstrates Lynch\'s ability to make the microscopic world feel vast and strange, transforming simple nature documentary into something that evokes existential unease about life, consciousness, and the incomprehensible Other.',
      tags: ['Experimental', 'Nature', 'Insects'],
      youtubeId: 'sDAJIWvTKw8',
    },
    {
      id: 'sf19',
      title: 'Waiting for Mr. Lynch (2018)',
      thumbnail: 'https://i.ytimg.com/vi/olji_M9r7wA/maxresdefault.jpg',
      duration: '12 min',
      description: 'A meta-documentary that follows a film crew as they wait—and wait, and wait—for David Lynch to arrive for an interview that may never happen. The film captures the anxiety, boredom, and anticipation of waiting for the elusive artist, transforming the documentary form into something that mirrors Lynch\'s own fascination with mystery and absence. It\'s a meditation on Lynch\'s status as cinematic enigma, the artist who resists explanation and maintains his inscrutability even (or especially) when he\'s the subject.',
      tags: ['Documentary', 'Meta', 'Behind the Scenes'],
      youtubeId: 'olji_M9r7wA',
    },
    {
      id: 'sf20',
      title: 'Fire (Pozar) (2020)',
      thumbnail: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/07/The-David-Lynch-Theater-The-3Rs-2011.jpg?w=1200&h=675&fit=crop',
      duration: '9 min',
      description: 'A hypnotic meditation on fire as elemental force, captured with Lynch\'s characteristically patient observation. Flames dance and consume in extreme close-up, their movements mesmerizing and threatening. Lynch has always been drawn to fire—from the industrial infernos of Eraserhead to the matches in Twin Peaks—and here he isolates the element itself, exploring its beauty and destructive power. The droning soundtrack amplifies the trance-like quality, making nine minutes of burning feel like a ritual or a vision.',
      tags: ['Experimental', 'Fire', 'Visual Meditation'],
      youtubeId: 'BXTLsQBJSVc',
    },
    {
      id: 'sf21',
      title: 'The Adventures of Alan R. (2020)',
      thumbnail: 'https://pics.filmaffinity.com/The_Adventures_of_Alan_R_C-211771216-large.jpg',
      duration: '8 min',
      description: 'An animated adventure that follows the enigmatic Alan R. through a series of surreal encounters and inexplicable events. Created using Lynch\'s crude digital animation style, the film feels like a children\'s story filtered through a nightmare consciousness—colorful yet disturbing, whimsical yet ominous. Like much of Lynch\'s animated work, it resists conventional interpretation, existing in that uniquely Lynchian space where narrative logic breaks down and pure strangeness takes over.',
      tags: ['Animation', 'Adventure', 'Mystery'],
      youtubeId: 'bTNtvPn3KJ4',
    },
  ];

  // Blue Velvet videos
  const blueVelvetVideos: Video[] = [
    {
      id: 'doc1',
      title: 'David Lynch in Spain (2013)',
      thumbnail: 'https://www.indiewire.com/wp-content/uploads/2014/01/eraserhead.jpg',
      duration: '85 min',
      description: 'In this extensive interview conducted in Spain, David Lynch opens up about his entire filmography, from the industrial nightmares of Eraserhead to the metaphysical mysteries of Twin Peaks. He discusses his creative process, the role of intuition in his art, and how he catches ideas "like fishing." Lynch reveals his philosophical approach to filmmaking—one that embraces the mysterious and resists explanation. For over an hour, he offers rare insights into his methods while maintaining the enigmatic quality that makes his work so captivating.',
      tags: ['Interview', 'Documentary', 'Spain'],
      youtubeId: 'pPial9mu-RI',
    },
    {
      id: 'doc2',
      title: 'Meditation, Creativity, Peace (2012)',
      thumbnail: 'https://images.mubicdn.net/images/film/193214/cache-298034-1745494575/image-w1280.jpg',
      duration: '72 min',
      description: 'David Lynch has practiced Transcendental Meditation for over 40 years, and this documentary explores how this daily practice has profoundly shaped his creative life and artistic output. Lynch speaks with evangelical passion about meditation\'s ability to access deeper consciousness, unlock creativity, and bring inner peace. He discusses the David Lynch Foundation, which brings TM to at-risk populations, and makes a compelling case that consciousness itself is the ultimate creative tool. A fascinating look at the spiritual foundation beneath Lynch\'s dark artistic vision.',
      tags: ['Documentary', 'Meditation', 'Creativity'],
      youtubeId: 'BH4qD5Fzyjk',
    },
    {
      id: 'wc7',
      title: 'Film In Conversation / David Lynch (2015)',
      thumbnail: 'https://i.ytimg.com/vi/jGd6lnYTTY8/maxresdefault.jpg',
      duration: '105 min',
      description: 'An intimate, nearly two-hour conversation with David Lynch at BAFTA, covering his entire career from art student experiments to digital video innovations. Lynch discusses specific films in detail, his transition from painting to cinema, his love of Los Angeles, and his uncompromising artistic independence. The conversation reveals Lynch as thoughtful, humorous, and surprisingly accessible, offering concrete details about his process while maintaining his commitment to mystery. Essential viewing for understanding how Lynch thinks about cinema, storytelling, and the creative life.',
      tags: ['Interview', 'Conversation', 'Filmmaking'],
      youtubeId: 'jGd6lnYTTY8',
    },
    {
      id: 'wc8',
      title: 'David Lynch - Making \'The Big Dream\' (Documentary) (2013)',
      thumbnail: 'https://welcometotwinpeaks.com/wp-content/uploads/david-lynch-the-big-dream-studio.jpg',
      duration: '80 min',
      description: 'Go inside David Lynch\'s recording studio as he creates his second solo album "The Big Dream," a blues-tinged collection of atmospheric soundscapes and haunting vocals. The documentary captures Lynch\'s collaborative process with engineers and musicians, his hands-on approach to every sonic detail, and how he translates his visual aesthetic into pure sound. We see Lynch experimenting, playing instruments, and crafting the album\'s dreamlike atmosphere. It\'s a rare glimpse of Lynch as musician and sound designer, pursuing the same mysterious beauty in audio that defines his visual work.',
      tags: ['Documentary', 'Music', 'Album'],
      youtubeId: 'dfR_1HiMOY8',
    },
  ];

  // Eraserhead videos
  const eraserheadVideos: Video[] = [
    {
      id: 'wc1',
      title: 'David Lynch\'s last published broadcast speech (2024)',
      thumbnail: 'https://www.the-sun.com/wp-content/uploads/sites/6/2025/01/SC-Lynch-Last-Sighting-Breaker-OP-copy.jpg?quality=80&strip=all',
      duration: '10 min',
      description: 'In what would become his final public broadcast message, David Lynch speaks directly to the world with characteristic warmth and wisdom. Filmed in his home studio, he addresses the state of consciousness, the importance of inner peace, and his hopes for humanity\'s future. Lynch\'s gentle voice and thoughtful demeanor create an atmosphere of intimacy and reflection. This poignant farewell contains the essence of Lynch\'s philosophy—that beauty and darkness coexist, that consciousness matters, and that love ultimately transcends all understanding.',
      tags: ['Speech', '2024', 'Final Message'],
      youtubeId: 'RY6u1d5qzgU',
    },
    {
      id: 'wc2',
      title: 'David Lynch\'s Message for the World (2024)',
      thumbnail: 'https://indiehoy.com/wp-content/uploads/2020/05/david-lynch.jpg',
      duration: '8 min',
      description: 'David Lynch delivers an urgent message about global consciousness, human connection, and the critical need for inner peace in turbulent times. Speaking with emotional directness rare in his public appearances, Lynch addresses environmental concerns, social division, and the power of Transcendental Meditation to transform both individuals and society. This heartfelt appeal reveals Lynch not just as an artist of darkness, but as a sincere advocate for human enlightenment and collective awakening.',
      tags: ['Message', 'Philosophy', '2024'],
      youtubeId: 'OyRFpeliBVk',
    },
    {
      id: 'wc3',
      title: 'David Lynch\'s Weather Report (6/1/2021)',
      thumbnail: 'https://i.ytimg.com/vi/a1JXgVHuX5E/maxresdefault.jpg',
      duration: '2 min',
      description: 'One of Lynch\'s beloved daily weather reports, a ritual he maintained on his website for years. Standing before his Los Angeles backdrop, Lynch reports the temperature, describes the sky, and offers his signature "have a great day!" These brief videos became cult phenomena—mundane yet deeply Lynchian, transforming weather reportage into performance art. The simplicity and sincerity create an oddly touching connection between the enigmatic filmmaker and his audience, proving that even the everyday can be mysterious in Lynch\'s hands.',
      tags: ['Weather Report', 'Daily', '2021'],
      youtubeId: 'a1JXgVHuX5E',
    },
    {
      id: 'wc4',
      title: 'David Lynch\'s Weather Report (8/21/2020)',
      thumbnail: 'https://i.ytimg.com/vi/srT7vXsucHM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC98pC9b-VdOjvs7lK-DM38I1eVRA',
      duration: '2 min',
      description: 'Another entry in Lynch\'s daily weather report series, this one capturing a particular Los Angeles afternoon in summer 2020. These videos became a comforting ritual for fans during the pandemic, offering two minutes of Lynch\'s calming presence and his genuine enthusiasm for clear blue skies and golden sunshine. The weather report format—so ordinary, so predictable—becomes strangely profound through Lynch\'s commitment to the ritual, transforming meteorological observation into Zen practice.',
      tags: ['Weather Report', 'Daily', '2020'],
      youtubeId: 'srT7vXsucHM',
    },
    {
      id: 'wc5',
      title: 'David Lynch on the Quest for the Perfect Milkshake',
      thumbnail: 'https://i.ytimg.com/vi/aWjTMITOVuA/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGQgZShTMA8=&rs=AOn4CLBNhF1_Skp5Uhwgkgopu2Aaya78Ng',
      duration: '12 min',
      description: 'In this delightful and surprisingly profound interview, Lynch discusses his lifelong quest to find the perfect milkshake—thick, cold, with just the right vanilla flavor. What begins as whimsical food talk becomes a meditation on perfection, obsession, and the importance of simple pleasures. Lynch\'s enthusiasm is infectious as he describes his ideal shake, revealing the same attention to sensory detail that informs his films. It\'s Lynch at his most accessible and charming, finding transcendence in ice cream and milk.',
      tags: ['Interview', 'Milkshake', 'Humor'],
      youtubeId: 'aWjTMITOVuA',
    },
    {
      id: 'wc6',
      title: 'David Lynch on discovering the internet',
      thumbnail: 'https://i.ytimg.com/vi/mx_evN_IjmM/maxresdefault.jpg',
      duration: '15 min',
      description: 'Lynch discusses his fascination with the internet and digital technology with the enthusiasm of someone discovering a new artistic medium. He talks about his early experiments with web design, streaming video, and online communities, seeing the internet not as a threat to cinema but as an extension of creative possibility. Lynch\'s embrace of digital tools—from consumer cameras to web platforms—demonstrates his fundamental openness to new forms and his belief that ideas, not equipment, make art. A revealing glimpse of Lynch as technological optimist.',
      tags: ['Interview', 'Internet', 'Technology'],
      youtubeId: 'mx_evN_IjmM',
    },
    {
      id: 'wc9',
      title: 'Love to Paint (2011)',
      thumbnail: 'https://welcometotwinpeaks.com/wp-content/uploads/david-lynch-william-griffin-boy-lights-fire.jpg',
      duration: '3 min',
      description: 'In this brief but heartfelt message, Lynch talks about his first and enduring love: painting. Before he became a filmmaker, Lynch was a painter, and he\'s never stopped creating visual art alongside his cinema. He describes the tactile pleasure of working with paint, the freedom of the canvas, and how painting and filmmaking feed each other in his creative practice. Lynch\'s passion is palpable—painting isn\'t just a hobby but a fundamental way of seeing and being in the world.',
      tags: ['Message', 'Visual Art', 'Painting'],
      youtubeId: 'Xr0ywdG0Z_U',
    },
  ];

  // Mind Control videos
  const mindControlVideos: Video[] = [
    {
      id: 'bso1',
      title: 'BlueBOB (2001)',
      thumbnail: 'https://cdn-images.dzcdn.net/images/cover/c8a92e2179705916d8718c664e6c8207/0x1900-000000-80-0-0.jpg',
      duration: 'Album',
      description: 'David Lynch\'s debut album, created in collaboration with sound engineer John Neff, is a dark industrial soundscape that feels like the audio equivalent of Eraserhead. Pulsing drones, distorted textures, and unsettling atmospheres create a sonic environment that\'s both hypnotic and claustrophobic. BlueBOB explores the same industrial wastelands that define Lynch\'s visual work, but through pure sound—grinding machinery, distant echoes, and ominous bass frequencies that seem to emanate from some nightmare factory. Essential listening for understanding Lynch\'s sonic aesthetic.',
      tags: ['Album', 'Industrial', 'Experimental'],
      youtubeId: 'r3zXpYLptEo',
    },
    {
      id: 'bso2',
      title: 'Dark Night of the Soul (2010)',
      thumbnail: 'https://beatsperminute.com/wp-content/uploads/2009/05/darksoul452.jpg',
      duration: 'Album',
      description: 'A landmark collaboration between Danger Mouse, Sparklehorse, and an array of guest vocalists, with David Lynch contributing a stunning photo book of images that inspired the music. Though Lynch didn\'t create the songs, his visual aesthetic permeates the project—his haunting photographs of decay, beauty, and darkness provide the emotional foundation for an album that explores melancholy, longing, and existential dread. The result is a multimedia artwork where Lynch\'s images and the musicians\' sounds create a unified meditation on loss and loneliness.',
      tags: ['Album', 'Collaboration', 'Alternative'],
      youtubeId: 'WX0IKZFii_U',
    },
    {
      id: 'bso3',
      title: 'Crazy Clown Time (2011)',
      thumbnail: 'https://f4.bcbits.com/img/0031611637_71.jpg',
      duration: 'Album',
      description: 'Lynch\'s first solo album as singer-songwriter is as strange and unsettling as its title suggests. His processed vocals drift over minimal electronic beats, creating songs that feel less like traditional music and more like transmissions from an alternate dimension. Tracks range from the menacing title song to eerily beautiful ballads, all infused with Lynch\'s signature darkness. The album divides listeners—some find it fascinating, others deeply uncomfortable—which is precisely the point. This is Lynch refusing to be anything other than himself, even in a medium not traditionally his own.',
      tags: ['Album', 'Solo', 'Electronic'],
      youtubeId: 'tjxgQjgyqlM',
    },
    {
      id: 'bso4',
      title: 'The Big Dream (2013)',
      thumbnail: 'https://filtermexico.com/wp-content/uploads/2013/06/david_lynch-the_big_dream-cover-1000x600.jpg',
      duration: 'Album',
      description: 'Lynch\'s second solo album takes a more blues-influenced approach, featuring collaborations with musicians including Lykke Li and singer Chrysta Bell. The result is more melodic than Crazy Clown Time but no less atmospheric—songs drift between dreamy soundscapes and menacing undertones, channeling the spirit of American blues through Lynch\'s distinctly surreal sensibility. His vocals remain haunting and strange, but the production is richer and more cinematic. The Big Dream feels like the soundtrack to a Lynch film that exists only in sound.',
      tags: ['Album', 'Blues', 'Atmospheric'],
      youtubeId: 'YxEk44Zj5Kw',
    },
    {
      id: 'bso5',
      title: 'B.S.O. Playlist',
      thumbnail: 'https://filmmusicreporter.com/wp-content/uploads/2021/09/va-41-1024x1024.jpg',
      duration: 'Playlist',
      description: 'A curated journey through David Lynch\'s cinematic soundscapes, from Angelo Badalamenti\'s haunting Twin Peaks themes to the industrial nightmares of Eraserhead\'s sound design. This collection showcases Lynch\'s genius for sonic atmosphere—how he uses music and sound not just as accompaniment but as essential narrative elements. The playlist reveals Lynch\'s eclectic musical taste, spanning dreamy jazz, ominous drones, vintage pop, and experimental noise. Together, these soundtracks create a sonic map of Lynch\'s entire artistic universe, proving that his films are as much heard as seen.',
      tags: ['Soundtrack', 'Compilation', 'Film Music'],
      youtubeId: 'TGGoVD2bZPA',
    },
  ];

  // Get My List and Liked videos using context
  const { myList, likedVideos } = useFavorites();
  
  // Combine all videos to filter from
  const allVideos = [
    ...twinPeaksVideos,
    ...filmsVideos,
    ...mulhollandDriveVideos,
    ...blueVelvetVideos,
    ...eraserheadVideos,
    ...mindControlVideos,
  ];
  
  // Filter videos that are in My List
  const myListVideos = allVideos.filter(video => myList.includes(video.id));
  
  // Filter videos that are liked
  const favoriteVideos = allVideos.filter(video => likedVideos.includes(video.id));
  
  // Determine hero video based on active category
  let heroVideo: Video = twinPeaksVideos[0]; // Default
  
  switch (activeCategory) {
    case 'Dreamscape Films':
      heroVideo = twinPeaksVideos[0];
      break;
    case 'Midnight Series':
      heroVideo = filmsVideos[0];
      break;
    case 'Strange Short Films':
      heroVideo = mulhollandDriveVideos[0];
      break;
    case 'Inner Light Docs':
      heroVideo = blueVelvetVideos[0];
      break;
    case 'Whispered Conversations':
      heroVideo = eraserheadVideos[0];
      break;
    case 'Soundscapes':
      heroVideo = mindControlVideos[0];
      break;
    case 'My List':
      heroVideo = myListVideos.length > 0 ? myListVideos[0] : twinPeaksVideos[0];
      break;
    case 'Favorites':
      heroVideo = favoriteVideos.length > 0 ? favoriteVideos[0] : twinPeaksVideos[0];
      break;
    default: // 'All'
      heroVideo = twinPeaksVideos[0];
  }
  
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        backgroundImage: 'url(https://i.pinimg.com/1200x/aa/ad/29/aaad29a60279456791c6b836077a359f.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar 
        transparent 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        profile="conspiranoia"
        onLogoClick={handleLogoClick}
      />

      <Hero
        key={heroVideo.id}
        title={heroVideo.title}
        description={heroVideo.description || ''}
        backgroundImage="https://i.pinimg.com/1200x/b8/9c/a6/b89ca63a863a22a9503b3d40b91cf774.jpg"
        onPlayClick={() => onVideoClick(heroVideo)}
        onInfoClick={() => onVideoClick(heroVideo)}
      />

      <div style={{ marginTop: '-150px', position: 'relative', zIndex: 10 }}>
        {/* My List - Only show if there are videos in the list */}
        {myListVideos.length > 0 && (activeCategory === 'All' || activeCategory === 'My List') && (
          <ContentRow
            title="My List"
            videos={myListVideos}
            onVideoClick={onVideoClick}
          />
        )}
        
        {/* Favorites - Only show if there are liked videos */}
        {favoriteVideos.length > 0 && (activeCategory === 'All' || activeCategory === 'Favorites') && (
          <ContentRow
            title="Favorites"
            videos={favoriteVideos}
            onVideoClick={onVideoClick}
          />
        )}
        
        {(activeCategory === 'All' || activeCategory === 'Dreamscape Films') && (
          <ContentRow
            title="Dreamscape Films"
            videos={twinPeaksVideos}
            onVideoClick={onVideoClick}
          />
        )}

        {(activeCategory === 'All' || activeCategory === 'Midnight Series') && (
          <ContentRow
            title="Midnight Series"
            videos={filmsVideos}
            onVideoClick={onVideoClick}
          />
        )}

        {(activeCategory === 'All' || activeCategory === 'Strange Short Films') && (
          <ContentRow
            title="Strange Short Films"
            videos={mulhollandDriveVideos}
            onVideoClick={onVideoClick}
          />
        )}

        {(activeCategory === 'All' || activeCategory === 'Inner Light Docs') && (
          <ContentRow
            title="Inner Light Docs"
            videos={blueVelvetVideos}
            onVideoClick={onVideoClick}
          />
        )}

        {(activeCategory === 'All' || activeCategory === 'Whispered Conversations') && (
          <ContentRow
            title="Whispered Conversations"
            videos={eraserheadVideos}
            onVideoClick={onVideoClick}
          />
        )}

        {(activeCategory === 'All' || activeCategory === 'Soundscapes') && (
          <ContentRow
            title="Soundscapes"
            videos={mindControlVideos}
            onVideoClick={onVideoClick}
          />
        )}
      </div>

      <Footer profile="conspiranoia" />

      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}