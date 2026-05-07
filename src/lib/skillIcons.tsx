import {
	SiHtml5,
	SiCss,
	SiSass,
	SiJavascript,
	SiTypescript,
	SiReact,
	SiExpo,
	SiVuedotjs,
	SiNuxt,
	SiEmberdotjs,
	SiTailwindcss,
	SiNodedotjs,
	SiExpress,
	SiPhp,
	SiGit,
	SiGithub,
	SiDocker,
	SiSalesforce,
	SiWordpress,
	SiDrupal,
	SiFigma,
	SiJira,
} from 'react-icons/si'
import { BiLogoMagento } from 'react-icons/bi'
import { VscAzure } from 'react-icons/vsc'
import type { IconType } from 'react-icons'
import type { FC, SVGProps } from 'react'
import BrazeIconRaw from '../assets/icons/braze.svg?react'
import RestIconRaw from '../assets/icons/rest.svg?react'
import AdobeCCIconRaw from '../assets/icons/adobeCC.svg?react'
import CSharpIconRaw from '../assets/icons/cSharp.svg?react'
import DotNetIconRaw from '../assets/icons/dotnet.svg?react'
import GsapIconRaw from '../assets/icons/gsap.svg?react'

type AnyIcon = IconType | FC<SVGProps<SVGSVGElement>>

export function svgIcon(Raw: FC<SVGProps<SVGSVGElement>>): AnyIcon {
	return ({ color, size, style, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
		<Raw style={{ color, ...style }} width={size ?? 24} height={size ?? 24} {...props} />
	)
}

const BrazeIcon		= svgIcon(BrazeIconRaw)
const AdobeCCIcon	= svgIcon(AdobeCCIconRaw)
const CSharpIcon	= svgIcon(CSharpIconRaw)
const DotNetIcon	= svgIcon(DotNetIconRaw)
const GsapIcon		= svgIcon(GsapIconRaw)
const RestIcon		= svgIcon(RestIconRaw)

export const skillIcons: Record<string, AnyIcon> = {
	'braze':                  BrazeIcon,
	'adobe creative cloud':   AdobeCCIcon,
	'c#':                     CSharpIcon,
	'.net':                   DotNetIcon,
	'gsap':                   GsapIcon,
	'rest api':               RestIcon,
	'html':                   SiHtml5,
	'css':                    SiCss,
	'scss':                   SiSass,
	'javascript':             SiJavascript,
	'typescript':             SiTypescript,
	'react':                  SiReact,
	'react native':           SiReact,
	'expo go':                SiExpo,
	'vue.js':                 SiVuedotjs,
	'nuxt':                   SiNuxt,
	'ember.js':               SiEmberdotjs,
	'tailwind css':           SiTailwindcss,
	'node.js':                SiNodedotjs,
	'express.js':             SiExpress,
	'php':                    SiPhp,
	'git':                    SiGit,
	'github':                 SiGithub,
	'azure devops':           VscAzure,
	'docker':                 SiDocker,
	'salesforce':             SiSalesforce,
	'wordpress':              SiWordpress,
	'drupal':                 SiDrupal,
	'magento':                BiLogoMagento,
	'figma':                  SiFigma,
	'jira':                   SiJira,
}

export const skillColors: Record<string, string> = {
	'html':                   '#E34F26',
	'css':                    '#1572B6',
	'scss':                   '#CC6699',
	'javascript':             '#F7DF1E',
	'typescript':             '#3178C6',
	'react':                  '#61DAFB',
	'react native':           '#61DAFB',
	'expo go':                '#000020',
	'vue.js':                 '#4FC08D',
	'nuxt':                   '#00DC82',
	'ember.js':               '#E04E39',
	'tailwind css':           '#06B6D4',
	'node.js':                '#339933',
	'express.js':             '#000000',
	'.net':                   '#512BD4',
	'php':                    '#777BB4',
	'git':                    '#F05032',
	'github':                 '#181717',
	'azure devops':           '#0078D7',
	'docker':                 '#2496ED',
	'salesforce':             '#00A1E0',
	'wordpress':              '#21759B',
	'drupal':                 '#0678BE',
	'magento':                '#EE672F',
	'figma':                  '#F24E1E',
	'jira':                   '#0052CC',
	'braze':                  '#FF4915',
	'adobe creative cloud':   '#FA0C00',
	'c#':                     '#239120',
	'gsap':                   '#88CE02',
	'rest api':               '#6DB33F',
}

// Invert behaviour moved to iconThemeConfig — see src/lib/iconThemeConfig.ts
