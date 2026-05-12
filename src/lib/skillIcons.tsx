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
	SiNextdotjs,
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
	SiRollupdotjs,
} from 'react-icons/si'
import { BiLogoMagento } from 'react-icons/bi'
import type { IconType } from 'react-icons'
import type { FC, SVGProps } from 'react'
import AdobeCCIconRaw    from '../assets/icons/adobeCC.svg?react'
import AzureDevopsIconRaw from '../assets/icons/azureDevops.svg?react'
import BrazeIconRaw      from '../assets/icons/braze.svg?react'
import CSharpIconRaw     from '../assets/icons/cSharp.svg?react'
import DotnetIconRaw     from '../assets/icons/dotnet.svg?react'
import GsapIconRaw       from '../assets/icons/gsap.svg?react'
import LiquidIconRaw     from '../assets/icons/liquidjs.svg?react'
import MjmlIconRaw       from '../assets/icons/mjml.svg?react'
import PostgresqlIconRaw from '../assets/icons/postgresql.svg?react'
import RestIconRaw       from '../assets/icons/rest.svg?react'
import ViteIconRaw       from '../assets/icons/vite.svg?react'
import WebpackIconRaw    from '../assets/icons/webpack.svg?react'

type AnyIcon = IconType | FC<SVGProps<SVGSVGElement>>

export function svgIcon(Raw: FC<SVGProps<SVGSVGElement>>): AnyIcon {
	return ({ color, size, style, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
		<Raw style={{ color, ...style }} width={size ?? 24} height={size ?? 24} {...props} />
	)
}

const AdobeCCIcon    = svgIcon(AdobeCCIconRaw)
const AzureDevopsIcon = svgIcon(AzureDevopsIconRaw)
const BrazeIcon      = svgIcon(BrazeIconRaw)
const CSharpIcon     = svgIcon(CSharpIconRaw)
const DotnetIcon     = svgIcon(DotnetIconRaw)
const GsapIcon       = svgIcon(GsapIconRaw)
const LiquidIcon     = svgIcon(LiquidIconRaw)
const MjmlIcon       = svgIcon(MjmlIconRaw)
const PostgresqlIcon = svgIcon(PostgresqlIconRaw)
const RestIcon       = svgIcon(RestIconRaw)
const ViteIcon       = svgIcon(ViteIconRaw)
const WebpackIcon    = svgIcon(WebpackIconRaw)

export const skillIcons: Record<string, AnyIcon> = {
	'adobe creative cloud':   AdobeCCIcon,
	'angular':                SiAngular,
	'azure devops':           AzureDevopsIcon,
	'braze':                  BrazeIcon,
	'c#':                     CSharpIcon,
	'css':                    SiCss,
	'docker':                 SiDocker,
	'.net':                   DotnetIcon,
	'drupal':                 SiDrupal,
	'ember.js':               SiEmberdotjs,
	'expo go':                SiExpo,
	'express.js':             SiExpress,
	'figma':                  SiFigma,
	'git':                    SiGit,
	'github':                 SiGithub,
	'gsap':                   GsapIcon,
	'html':                   SiHtml5,
	'javascript':             SiJavascript,
	'jira':                   SiJira,
	'liquid.js':              LiquidIcon,
	'magento':                BiLogoMagento,
	'mjml':                   MjmlIcon,
	'next.js':                SiNextdotjs,
	'node.js':                SiNodedotjs,
	'nuxt':                   SiNuxt,
	'php':                    SiPhp,
	'postgresql':             PostgresqlIcon,
	'react':                  SiReact,
	'react native':           SiReact,
	'rest api':               RestIcon,
	'rollup':                 SiRollupdotjs,
	'salesforce':             SiSalesforce,
	'scss':                   SiSass,
	'tailwind css':           SiTailwindcss,
	'typescript':             SiTypescript,
	'vite':                   ViteIcon,
	'vue.js':                 SiVuedotjs,
	'webpack':                WebpackIcon,
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
	'.net':                   '#512BD4',
	'drupal':                 '#0678BE',
	'ember.js':               '#E04E39',
	'expo go':                '#000020',
	'express.js':             '#000000',
	'figma':                  '#F24E1E',
	'git':                    '#F05032',
	'github':                 '#181717',
	'gsap':                   '#88CE02',
	'html':                   '#E34F26',
	'javascript':             '#F7DF1E',
	'jira':                   '#0052CC',
	'liquid.js':              '#0e83cd',
	'magento':                '#EE672F',
	'mjml':                   '#f45e43',
	'next.js':                '#000000',
	'node.js':                '#339933',
	'nuxt':                   '#00DC82',
	'php':                    '#777BB4',
	'postgresql':             '#336791',
	'react':                  '#61DAFB',
	'react native':           '#61DAFB',
	'rest api':               '#6DB33F',
	'rollup':                 '#FF3333',
	'salesforce':             '#00A1E0',
	'scss':                   '#CC6699',
	'tailwind css':           '#06B6D4',
	'typescript':             '#3178C6',
	'vite':                   '#646CFF',
	'vue.js':                 '#4FC08D',
	'webpack':                '#8DD6F9',
	'wordpress':              '#21759B',
}

// Invert behaviour moved to iconThemeConfig — see src/lib/iconThemeConfig.ts
