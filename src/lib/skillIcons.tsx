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
	SiAngular,
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
import LiquidIconRaw from '../assets/icons/liquidjs.svg?react'
import MjmlIconRaw from '../assets/icons/mjml.svg?react'
import NextIconRaw from '../assets/icons/next.svg?react'

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
const LiquidIcon	= svgIcon(LiquidIconRaw)
const RestIcon		= svgIcon(RestIconRaw)
const MjmlIcon		= svgIcon(MjmlIconRaw)
const NextIcon		= svgIcon(NextIconRaw)

export const skillIcons: Record<string, AnyIcon> = {
	'adobe creative cloud':   AdobeCCIcon,
	'angular':                SiAngular,
	'azure devops':           VscAzure,
	'braze':                  BrazeIcon,
	'c#':                     CSharpIcon,
	'css':                    SiCss,
	'docker':                 SiDocker,
	'.net':                   DotNetIcon,
	'drupal':                 SiDrupal,
	'ember.js':               SiEmberdotjs,
	'expo go':                SiExpo,
	'express.js':             SiExpress,
	'figma':                  SiFigma,
	'git':                    SiGit,
	'github':                 SiGithub,
	'gsap':                   GsapIcon,
	'liquid.js':              LiquidIcon,
	'html':                   SiHtml5,
	'jira':                   SiJira,
	'javascript':             SiJavascript,
	'typescript':             SiTypescript,
	'magento':                BiLogoMagento,
	'mjml':                   MjmlIcon,
	'next.js':                NextIcon,
	'nuxt':                   SiNuxt,
	'php':                    SiPhp,
	'react':                  SiReact,
	'react native':           SiReact,
	'rest api':               RestIcon,
	'salesforce':             SiSalesforce,
	'scss':                   SiSass,
	'tailwind css':           SiTailwindcss,
	'node.js':                SiNodedotjs,
	'vue.js':                 SiVuedotjs,
	'wordpress':              SiWordpress,
}

export const skillColors: Record<string, string> = {
	'adobe creative cloud':   '#FA0C00',
	'angular':                '#B52E31',
	'azure devops':           '#0078D7',
	'braze':                  '#FF4915',
	'c#':                     '#239120',
	'css':                    '#1572B6',
	'docker':                 '#2496ED',
	'drupal':                 '#0678BE',
	'ember.js':               '#E04E39',
	'express.js':             '#000000',
	'expo go':                '#000020',
	'figma':                  '#F24E1E',
	'git':                    '#F05032',
	'github':                 '#181717',
	'gsap':                   '#88CE02',
	'liquid.js':              '#0e83cd',
	'html':                   '#E34F26',
	'javascript':             '#F7DF1E',
	'jira':                   '#0052CC',
	'magento':                '#EE672F',
	'mjml':                   '#f45e43',
	'node.js':                '#339933',
	'.net':                   '#512BD4',
	'nuxt':                   '#00DC82',
	'php':                    '#777BB4',
	'react':                  '#61DAFB',
	'react native':           '#61DAFB',
	'rest api':               '#6DB33F',
	'scss':                   '#CC6699',
	'tailwind css':           '#06B6D4',
	'typescript':             '#3178C6',
	'salesforce':             '#00A1E0',
	'vue.js':                 '#4FC08D',
	'wordpress':              '#21759B'
}

// Invert behaviour moved to iconThemeConfig — see src/lib/iconThemeConfig.ts
