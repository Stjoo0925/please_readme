import React, { useState } from 'react';
import { Profile, GitHubStats } from '../../types/profile';
import { TechBadge } from '../ui/TechBadge';
import Image from 'next/image';
import { Rank } from '@/utils/rankUtils';

interface ProfileCardProps {
  profile: Profile;
  stats: GitHubStats | null;
  loading: boolean;
  onDownload?: () => void;
}

// 랭크별 전체 디자인 요소 모음 (색상, 배경, 효과 등)
const rankDesignSystem: Record<string, {
  border: string;         // 테두리 스타일
  background: string;     // 배경 스타일 (그라데이션 등)
  textColor: string;      // 랭크 텍스트 색상
  glow: string;           // 외부 발광 효과
  badge: string;          // 배지 스타일
  shadow: string;         // 그림자 효과
  statsBg: string;        // 통계 항목 배경
}> = {
  'S': {
    border: 'border-purple-400',
    background: 'bg-gradient-to-br from-purple-900/30 to-purple-800/20',
    textColor: 'text-purple-400',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
    badge: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
    shadow: 'shadow-lg shadow-purple-900/30',
    statsBg: 'bg-purple-900/20',
  },
  'A+': {
    border: 'border-blue-400',
    background: 'bg-gradient-to-br from-blue-900/30 to-blue-800/20',
    textColor: 'text-blue-400',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    badge: 'bg-gradient-to-r from-blue-500 to-sky-500 text-white',
    shadow: 'shadow-lg shadow-blue-900/30',
    statsBg: 'bg-blue-900/20',
  },
  'A': {
    border: 'border-blue-300',
    background: 'bg-gradient-to-br from-blue-900/20 to-blue-800/10',
    textColor: 'text-blue-300',
    glow: 'shadow-[0_0_12px_rgba(59,130,246,0.2)]',
    badge: 'bg-blue-500 text-white',
    shadow: 'shadow-md shadow-blue-900/20',
    statsBg: 'bg-blue-900/10',
  },
  'A-': {
    border: 'border-sky-300',
    background: 'bg-gradient-to-br from-sky-900/20 to-sky-800/10',
    textColor: 'text-sky-300',
    glow: 'shadow-[0_0_10px_rgba(14,165,233,0.2)]',
    badge: 'bg-sky-500 text-white',
    shadow: 'shadow-md shadow-sky-900/20',
    statsBg: 'bg-sky-900/10',
  },
  'B+': {
    border: 'border-green-400',
    background: 'bg-gradient-to-br from-green-900/20 to-green-800/10',
    textColor: 'text-green-400',
    glow: '',
    badge: 'bg-green-500 text-white',
    shadow: 'shadow-md shadow-green-900/20',
    statsBg: 'bg-green-900/10',
  },
  'B': {
    border: 'border-green-300',
    background: 'bg-gray-800',
    textColor: 'text-green-300',
    glow: '',
    badge: 'bg-green-400 text-white',
    shadow: 'shadow-md',
    statsBg: 'bg-gray-700/50',
  },
  'B-': {
    border: 'border-lime-300',
    background: 'bg-gray-800',
    textColor: 'text-lime-300',
    glow: '',
    badge: 'bg-lime-400 text-white',
    shadow: 'shadow-md',
    statsBg: 'bg-gray-700/50',
  },
  'C+': {
    border: 'border-yellow-300',
    background: 'bg-gray-800',
    textColor: 'text-yellow-300',
    glow: '',
    badge: 'bg-yellow-400 text-white',
    shadow: 'shadow-md',
    statsBg: 'bg-gray-700/50',
  },
  'C': {
    border: 'border-yellow-200',
    background: 'bg-gray-800',
    textColor: 'text-yellow-200',
    glow: '',
    badge: 'bg-yellow-300 text-white',
    shadow: 'shadow-md',
    statsBg: 'bg-gray-700/50',
  },
  '?': {
    border: 'border-gray-700',
    background: 'bg-gray-800',
    textColor: 'text-gray-400',
    glow: '',
    badge: 'bg-gray-400 text-white',
    shadow: 'shadow-md',
    statsBg: 'bg-gray-700/50',
  },
};

export default function ProfileCard({ profile, stats, loading, onDownload }: ProfileCardProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="h-48 bg-gray-700 rounded-lg mb-4" />
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-700 rounded w-16" />
          <div className="h-6 bg-gray-700 rounded w-16" />
        </div>
      </div>
    );
  }

  const rankLevel = stats?.rank?.level ?? '?';
  const design = rankDesignSystem[rankLevel] ?? rankDesignSystem['?'];
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <div className={`relative w-full md:w-[480px] h-[600px] rounded-lg overflow-hidden border-2 transition-all duration-300
      ${design.border} ${design.shadow} ${design.glow}
      dark`}
    >
      <div className={`${design.background} p-6`}>
        <div className="flex items-center gap-4">
          {stats?.avatarUrl && (
            <div className={`relative w-20 h-20 rounded-full overflow-hidden border-2 ${design.border} p-0.5 bg-white dark:bg-gray-800`}>
              <Image
                src={stats.avatarUrl}
                alt={profile.name || profile.githubUsername || "Profile image"}
                fill
                className="object-cover rounded-full"
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white">
              {profile.name || stats?.name || '이름 없음'}
            </h2>
            <p className="text-gray-400 flex items-center">
              @{profile.githubUsername}
            </p>
          </div>
        </div>
      </div>

      <div className={`relative ${design.background} min-h-[500px]`}>
        <div className="relative z-10 p-4 h-full flex flex-col">
          <div className="text-lg font-semibold mb-2 text-gray-200">
            소개
          </div>
          <p className="text-gray-300 mb-4 p-2 rounded-lg shadow-sm bg-gray-800/70">
            {profile.bio || stats?.bio || '소개가 없습니다.'}
          </p>

          {profile.skills.length > 0 && <div className="h-px my-4 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>}

          {profile.skills.length > 0 && (
            <>
              <div className="text-lg font-semibold mb-2 text-gray-200">
                기술스택
              </div>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {profile.skills.map((skill) => (
                  <TechBadge key={skill} tech={skill} />
                ))}
              </div>
            </>
          )}

          {profile.skills.length > 0 && stats && <div className="h-px my-6 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>}

          {stats && (
            <>
              <div className="text-lg font-semibold text-gray-200">
                GitHub 통계
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 mt-2">
                <div className={`flex flex-row justify-center items-center gap-3 text-center p-3 rounded-lg bg-gray-800/60 shadow-sm`}>
                  <div className="text-sm text-gray-300">
                    Commits | {currentYear}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {stats.currentYearCommits ?? '-'}
                  </div>
                </div>
                <div className={`flex flex-row justify-center items-center gap-3 text-center p-3 rounded-lg bg-gray-800/60 shadow-sm`}>
                  <div className="text-sm text-gray-300">
                    Total Stars
                  </div>
                  <div className="text-xl font-bold text-white">
                    {stats.totalStars ?? '-'}
                  </div>
                </div>
                <div className={`flex flex-row justify-center items-center gap-3 text-center p-3 rounded-lg bg-gray-800/60 shadow-sm`}>
                  <div className="text-sm text-gray-300">
                    Total PRs
                  </div>
                  <div className="text-xl font-bold text-white">
                    {stats.totalPRs ?? '-'}
                  </div>
                </div>
                <div className={`flex flex-row justify-center items-center gap-3 text-center p-3 rounded-lg bg-gray-800/60 shadow-sm`}>
                  <div className="text-sm text-gray-300">
                    Total Issues
                  </div>
                  <div className="text-xl font-bold text-white">
                    {stats.totalIssues ?? '-'}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-block px-6 py-3 rounded-lg bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-400 mr-2">Rank | {currentYear} :</span>
                  <span className={`text-3xl font-bold ${design.textColor}`}>
                    {stats.rank && stats.rank.level}
                  </span>
                </div>
              </div>
              <div className='flex justify-end mt-4'>
                <span className='text-gray-500 text-sm'>created by Please Readme</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 