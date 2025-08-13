// MASTER PLAN 2.0: Project Overview Component
// STATUS: Jules Senior Cockpit Implementation - Project Summary
// INTEGRATION: Conscious Agent - Senior-friendly Project Display
// ARCHITECTURE: Dual Consciousness Architecture compliant

import React from 'react';
import { ProjectOverview as ProjectOverviewType } from '../types/SeniorCockpitTypes';

/**
 * JULES PROJECT OVERVIEW
 * 
 * Senior-vänlig projektöversikt som visar vad som byggs,
 * nuvarande status och vad som redan är klart.
 * Döljer all teknisk komplexitet.
 */

interface ProjectOverviewProps {
  overview: ProjectOverviewType;
  className?: string;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  overview,
  className = ''
}) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getProgressMessage = (progress: number) => {
    if (progress >= 80) return 'Nästan klart! 🎉';
    if (progress >= 60) return 'Bra framsteg! 👍';
    if (progress >= 40) return 'På god väg! 🚀';
    if (progress >= 20) return 'Kommit igång! 💪';
    return 'Precis startat! 🌱';
  };

  return (
    <div className={`project-overview bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Projekttitel och beskrivning */}
      <div className="header mb-6">
        <div className="flex items-center mb-3">
          <span className="text-3xl mr-3">🏗️</span>
          <h1 className="text-2xl font-bold text-gray-800">{overview.title}</h1>
        </div>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          {overview.description}
        </p>
      </div>

      {/* Övergripande framsteg */}
      <div className="progress-section mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Övergripande Framsteg</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">{overview.overallProgress}%</span>
            <span className="text-sm text-gray-600">klart</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${getProgressColor(overview.overallProgress)}`}
            style={{ width: `${overview.overallProgress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {getProgressMessage(overview.overallProgress)}
          </span>
          {overview.estimatedCompletion && (
            <span className="text-sm text-gray-600">
              Beräknat klart: <span className="font-medium">{overview.estimatedCompletion}</span>
            </span>
          )}
        </div>
      </div>

      {/* Nuvarande fas */}
      <div className="current-phase mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">📍</span>
          <h3 className="text-lg font-semibold text-blue-800">Nuvarande Fas</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="phase-badge px-3 py-1 bg-blue-100 rounded-full border border-blue-300">
            <span className="text-blue-800 font-medium">{overview.currentPhase}</span>
          </div>
          <span className="text-blue-700">
            {overview.currentPhase === 'Crawl' && 'Bygger grunderna'}
            {overview.currentPhase === 'Walk' && 'Skapar funktionalitet'}
            {overview.currentPhase === 'Run' && 'Gör det användarvänligt'}
            {overview.currentPhase === 'Fly' && 'Gör det intelligent'}
          </span>
        </div>
      </div>

      {/* Vad som redan är klart */}
      {overview.keyAchievements && overview.keyAchievements.length > 0 && (
        <div className="achievements">
          <div className="flex items-center mb-4">
            <span className="text-xl mr-2">🏆</span>
            <h3 className="text-lg font-semibold text-gray-800">Vad Vi Redan Har Åstadkommit</h3>
          </div>
          
          <div className="space-y-3">
            {overview.keyAchievements.map((achievement, index) => (
              <div key={index} className="achievement-item flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-green-600 text-lg">✅</span>
                </div>
                <div className="flex-1">
                  <p className="text-green-800 font-medium">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uppmuntrande meddelande baserat på framsteg */}
      <div className="encouragement mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-center">
          <span className="text-2xl mr-3">
            {overview.overallProgress >= 80 ? '🎉' : 
             overview.overallProgress >= 60 ? '🚀' : 
             overview.overallProgress >= 40 ? '💪' : '🌱'}
          </span>
          <div>
            <div className="font-semibold text-gray-800">
              {overview.overallProgress >= 80 ? 'Fantastiskt arbete!' : 
               overview.overallProgress >= 60 ? 'Riktigt bra framsteg!' : 
               overview.overallProgress >= 40 ? 'Vi är på rätt väg!' : 'En bra start!'}
            </div>
            <div className="text-sm text-gray-600">
              {overview.overallProgress >= 80 ? 'Projektet närmar sig slutet och kommer snart att vara redo att användas.' : 
               overview.overallProgress >= 60 ? 'Vi har kommit långt och systemet börjar ta form.' : 
               overview.overallProgress >= 40 ? 'Grundarbetet är gjort och nu bygger vi vidare.' : 'Vi har lagt grunden och arbetar stadigt framåt.'}
            </div>
          </div>
        </div>
      </div>

      {/* Snabb-statistik */}
      <div className="quick-stats mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{overview.currentPhase}</div>
          <div className="text-xs text-gray-600">Nuvarande Fas</div>
        </div>
        
        <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{overview.overallProgress}%</div>
          <div className="text-xs text-gray-600">Klart</div>
        </div>
        
        <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{overview.keyAchievements?.length || 0}</div>
          <div className="text-xs text-gray-600">Milstones</div>
        </div>
        
        <div className="stat-item text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {overview.estimatedCompletion?.split(' ')[1] || '?'}
          </div>
          <div className="text-xs text-gray-600">Månader Kvar</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;