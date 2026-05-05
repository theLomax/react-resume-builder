import type { FC, SVGProps } from 'react'
import { svgIcon } from './skillIcons'

import usoLogo             from '../assets/icons/uso.svg'
import indyLogo            from '../assets/icons/indy.svg'
import atgLogo             from '../assets/icons/atg.svg'
import michaelsLogo        from '../assets/icons/michaels.svg'
import sckansLogo          from '../assets/icons/sckans.svg'
import infinitudeLogo      from '../assets/icons/infinitude.svg'
import pursuantLogo        from '../assets/icons/pursuant.svg'
import catAnimLogo         from '../assets/icons/cat-anim.svg'
import terminalRealityLogo from '../assets/icons/terminalReality.svg'
import smuLogo             from '../assets/icons/smu.svg'
import aiLogo              from '../assets/icons/ai.svg'

import HawkeyeRaw from '../assets/icons/hawkeye.svg?react'
import GearboxRaw from '../assets/icons/gearbox.svg?react'

export type AnyIcon = FC<SVGProps<SVGSVGElement>>

export const HawkeyeIcon = svgIcon(HawkeyeRaw)
export const GearboxIcon = svgIcon(GearboxRaw)

export const companyIcons: Record<string, AnyIcon> = {
	'publicis hawkeye':   HawkeyeIcon,
	'gearbox software':   GearboxIcon,
}

export const companyLogos: Record<string, string> = {
	'united sports officials':        usoLogo,
	'solo engineering':               indyLogo,
	'abelsontaylor':                  atgLogo,
	'michaels stores':                michaelsLogo,
	'southwestern college':           sckansLogo,
	'infinitude creative group':      infinitudeLogo,
	'pursuant':                       pursuantLogo,
	'cat animation studio':           catAnimLogo,
	'terminal reality':               terminalRealityLogo,
	'southern methodist university':  smuLogo,
	'the art institute of dallas':    aiLogo,
}
