import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Card, BottomNav, ShieldIndicator } from '../components';

interface TimelineStep {
  id: string;
  title: string;
  time: string;
  description: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export const ClaimProgressScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'earnings' | 'shield'>('shield');

  const timelineSteps: TimelineStep[] = [
    {
      id: 'detected',
      title: 'Detected',
      time: '14:02 PM',
      description: 'Weather sensors confirmed heavy rainfall (>5mm/hr) in your active zone.',
      icon: '📡',
      status: 'completed',
    },
    {
      id: 'verified',
      title: 'Verified',
      time: '14:15 PM',
      description: 'Zepto delivery logs analyzed. Your presence in the disruption zone was confirmed.',
      icon: '✓',
      status: 'completed',
    },
    {
      id: 'approved',
      title: 'Approved',
      time: 'In Progress',
      description: 'Estimated approval within 15 minutes. No action required.',
      icon: '✓',
      status: 'in-progress',
    },
    {
      id: 'paid',
      title: 'Paid',
      time: 'Pending',
      description: 'Instant transfer to your linked earnings account upon approval.',
      icon: '💰',
      status: 'pending',
    },
  ];

  const whatNextSteps = [
    {
      number: '01',
      title: 'Focus on Safety',
      description: "We've alerted the Zepto Hub that your delivery times may be extended.",
    },
    {
      number: '02',
      title: 'Stay Logged In',
      description: 'Keep your Zepto Partner App active to ensure continuous coverage tracking.',
    },
    {
      number: '03',
      title: 'Payout',
      description: 'A disruption bonus of ₹250 will be credited once verified.',
      highlight: '₹250',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Top AppBar */}
      <View style={styles.appBar}>
        <View style={styles.appBarContent}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profilePlaceholder}>RD</Text>
            </View>
            <Text style={styles.appTitle}>GigShield</Text>
          </View>
          <View style={styles.appBarRight}>
            <View style={styles.shieldBadge}>
              <Text style={styles.shieldBadgeIcon}>🛡️</Text>
              <Text style={styles.shieldBadgeText}>SHIELD ACTIVE</Text>
            </View>
            <TouchableOpacity style={styles.verifiedButton} activeOpacity={0.7}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.appBarDivider} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Live Alert Banner */}
        <View style={styles.alertBanner}>
          {/* Kinetic Background Accent */}
          <View style={styles.alertAccent} />

          <View style={styles.alertContent}>
            <View style={styles.alertHeader}>
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE ALERT</Text>
              </View>
              <View style={styles.alertTitleContainer}>
                <Text style={styles.alertTitle}>Rain Disruption Detected</Text>
                <Text style={styles.alertSubtitle}>
                  Automatic claim initialized for your current shift in Koramangala.
                </Text>
              </View>
              <View style={styles.alertIconContainer}>
                <Text style={styles.alertIcon}>🌧️</Text>
              </View>
            </View>

            <View style={styles.alertActions}>
              <TouchableOpacity style={styles.chatButton} activeOpacity={0.8}>
                <Text style={styles.chatButtonText}>Chat with Support</Text>
              </TouchableOpacity>
              <View style={styles.supportButton}>
                <Text style={styles.supportIcon}>🤖</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Claim Journey Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>Claim Progress</Text>

          <View style={styles.timeline}>
            {/* Vertical Track */}
            <View style={styles.timelineTrack} />
            <View style={styles.timelineProgress} />

            {timelineSteps.map((step, index) => (
              <View key={step.id} style={styles.timelineStep}>
                <View
                  style={[
                    styles.stepIcon,
                    step.status === 'completed' && styles.stepIconCompleted,
                    step.status === 'in-progress' && styles.stepIconInProgress,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepIconText,
                      step.status !== 'pending' && styles.stepIconTextActive,
                    ]}
                  >
                    {step.icon}
                  </Text>
                </View>
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text
                      style={[
                        styles.stepTitle,
                        step.status === 'pending' && styles.stepTitlePending,
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text
                      style={[
                        styles.stepTime,
                        step.status === 'in-progress' && styles.stepTimeItalic,
                      ]}
                    >
                      {step.time}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.stepDescription,
                      step.status === 'pending' && styles.stepDescriptionPending,
                    ]}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* What Happens Next Card */}
        <Card variant="default" style={styles.whatNextCard}>
          <View style={styles.whatNextHeader}>
            <View style={styles.helpIconContainer}>
              <Text style={styles.helpIcon}>?</Text>
            </View>
            <Text style={styles.whatNextTitle}>What happens next?</Text>
          </View>

          <View style={styles.whatNextList}>
            {whatNextSteps.map((item, index) => (
              <View key={index} style={styles.whatNextItem}>
                <Text style={styles.whatNextNumber}>{item.number}</Text>
                <Text style={styles.whatNextText}>
                  <Text style={styles.whatNextBold}>{item.title}:</Text>{' '}
                  <Text style={styles.whatNextDescription}>{item.description}</Text>
                  {item.highlight && (
                    <Text style={styles.whatNextHighlight}>{item.highlight}</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Bottom Nav Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  appBar: {
    backgroundColor: colors.surface,
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
    paddingTop: spacing[4],
  },
  appBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['primary-container'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    opacity: 0.2,
  },
  profilePlaceholder: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    fontSize: 14,
  },
  appTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.extrabold,
    fontStyle: 'italic',
    fontSize: typography.sizes['headline-md'],
    color: colors.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  shieldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['secondary-container'],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    gap: 6,
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  shieldBadgeIcon: {
    fontSize: 18,
  },
  shieldBadgeText: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['on-secondary-container'],
  },
  verifiedButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  appBarDivider: {
    height: 2,
    backgroundColor: colors['surface-container'],
  },
  scrollContent: {
    paddingTop: spacing[6],
    paddingHorizontal: spacing[6],
    paddingBottom: 100,
  },
  alertBanner: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.default,
    overflow: 'hidden',
    marginBottom: spacing[8],
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 12,
  },
  alertAccent: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: colors['primary-container'],
    opacity: 0.2,
  },
  alertContent: {
    padding: spacing[6],
    position: 'relative',
    zIndex: 1,
  },
  alertHeader: {
    marginBottom: spacing[6],
  },
  liveBadge: {
    backgroundColor: colors['secondary-container'],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: spacing[3],
  },
  liveText: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.extrabold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['on-secondary-container'],
  },
  alertTitleContainer: {
    marginBottom: spacing[4],
  },
  alertTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['title-lg'],
    color: colors['on-primary'],
    lineHeight: 28,
    marginBottom: spacing[1],
  },
  alertSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-md'],
    color: colors['on-primary'],
    opacity: 0.8,
    lineHeight: 20,
  },
  alertIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  alertIcon: {
    fontSize: 48,
    opacity: 0.8,
  },
  alertActions: {
    flexDirection: 'row',
    gap: spacing[4],
    alignItems: 'center',
  },
  chatButton: {
    flex: 1,
    backgroundColor: colors['surface-container-highest'],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  chatButtonText: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['body-sm'],
    color: colors.primary,
  },
  supportButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors['primary-dim'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors['on-primary'],
    opacity: 0.2,
  },
  supportIcon: {
    fontSize: 24,
  },
  timelineSection: {
    marginBottom: spacing[8],
  },
  timelineTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['title-lg'],
    color: colors['on-surface'],
    marginBottom: spacing[6],
    marginLeft: spacing[2],
  },
  timeline: {
    position: 'relative',
    paddingLeft: spacing[16],
  },
  timelineTrack: {
    position: 'absolute',
    left: 27,
    top: 16,
    bottom: 16,
    width: 4,
    backgroundColor: colors['surface-container-highest'],
    borderRadius: 2,
  },
  timelineProgress: {
    position: 'absolute',
    left: 27,
    top: 16,
    height: '50%',
    width: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  timelineStep: {
    flexDirection: 'row',
    gap: spacing[6],
    marginBottom: spacing[8],
    position: 'relative',
  },
  stepIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors['surface-container'],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderWidth: 4,
    borderColor: colors.surface,
  },
  stepIconCompleted: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  stepIconInProgress: {
    backgroundColor: colors.primary,
  },
  stepIconText: {
    fontSize: 24,
    opacity: 0.5,
  },
  stepIconTextActive: {
    opacity: 1,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  stepTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['body-lg'],
    color: colors.primary,
  },
  stepTitlePending: {
    color: colors['on-surface'],
    opacity: 0.5,
  },
  stepTime: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    color: colors.outline,
  },
  stepTimeItalic: {
    fontStyle: 'italic',
    color: colors.primary,
  },
  stepDescription: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-md'],
    color: colors['on-surface-variant'],
    lineHeight: 20,
  },
  stepDescriptionPending: {
    color: colors['on-surface-variant'],
    opacity: 0.6,
    fontStyle: 'italic',
  },
  whatNextCard: {
    marginBottom: spacing[12],
    padding: spacing[6],
    borderLeftWidth: 4,
    borderLeftColor: colors['secondary-fixed'],
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  whatNextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  helpIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['secondary-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: 20,
    color: colors['on-secondary-container'],
  },
  whatNextTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['title-md'],
    color: colors['on-surface'],
  },
  whatNextList: {
    gap: spacing[4],
  },
  whatNextItem: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  whatNextNumber: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.extrabold,
    fontSize: 32,
    color: colors['outline-variant'],
    opacity: 0.3,
  },
  whatNextText: {
    flex: 1,
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-md'],
    color: colors['on-surface-variant'],
    lineHeight: 20,
  },
  whatNextBold: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    color: colors['on-surface'],
  },
  whatNextDescription: {
    color: colors['on-surface-variant'],
  },
  whatNextHighlight: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  bottomSpacer: {
    height: 100,
  },
});
