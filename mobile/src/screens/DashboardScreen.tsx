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
import { Card, BottomNav } from '../components';

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'earnings' | 'shield'>('dashboard');

  const earningsData = [50, 67, 90, 75, 50, 60, 70]; // Mock weekly data
  const maxEarnings = Math.max(...earningsData);

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
          <View style={styles.securedBadge}>
            <Text style={styles.badgeIcon}>✓</Text>
            <Text style={styles.badgeText}>SECURED</Text>
          </View>
        </View>
        <View style={styles.appBarDivider} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status & Go Online */}
        <View style={styles.statusSection}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.partnerStatusLabel}>PARTNER STATUS</Text>
              <Text style={styles.statusTitle}>Go Online</Text>
            </View>
            <TouchableOpacity style={styles.powerButton} activeOpacity={0.8}>
              <Text style={styles.powerIcon}>⚡</Text>
            </TouchableOpacity>
          </View>

          {/* Shield Card */}
          <Card variant="glass" style={styles.shieldCard}>
            <View style={styles.shieldCardContent}>
              <View style={styles.shieldIconContainer}>
                <Text style={styles.shieldEmoji}>🛡️</Text>
              </View>
              <View style={styles.shieldTextContainer}>
                <Text style={styles.shieldTitle}>Active Zepto Protection</Text>
                <Text style={styles.shieldSubtitle}>Full accident & health coverage active</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </Card>
        </View>

        {/* Weather Alert */}
        <Card variant="default" style={styles.weatherAlert}>
          <View style={styles.alertContent}>
            <Text style={styles.alertIcon}>⛈️</Text>
            <View style={styles.alertText}>
              <Text style={styles.alertTitle}>Heavy Rain Alert: Koramangala Hub</Text>
              <Text style={styles.alertSubtitle}>
                Expected in 15 mins. Protective gear recommended. 1.5x rain surge active.
              </Text>
            </View>
          </View>
        </Card>

        {/* Earnings Trend */}
        <Card variant="elevated" style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsTitle}>Earnings Trend</Text>
            <View style={styles.weeklyBadge}>
              <Text style={styles.weeklyText}>WEEKLY</Text>
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.chart}>
            {earningsData.map((value, index) => (
              <View key={index} style={styles.chartColumn}>
                <View
                  style={[
                    styles.chartBar,
                    { height: `${(value / maxEarnings) * 100}%` },
                    index === 2 && styles.activeBar,
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.chartLabels}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <Text
                key={day}
                style={[
                  styles.chartLabel,
                  index === 2 && styles.activeChartLabel,
                ]}
              >
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.earningsFooter}>
            <View>
              <Text style={styles.payoutLabel}>Today's Payout</Text>
              <Text style={styles.payoutAmount}>₹1,240.50</Text>
            </View>
            <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.8}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Delivery Stats */}
        <View style={styles.statsGrid}>
          <Card variant="default" style={styles.statCard}>
            <Text style={styles.statIcon}>🛒</Text>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>Deliveries Today</Text>
            </View>
          </Card>
          <Card variant="high-vis" style={styles.ratingCard}>
            <Text style={styles.starIcon}>⭐</Text>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, styles.ratingValue]}>4.92</Text>
              <Text style={[styles.statLabel, styles.ratingLabel]}>Partner Rating</Text>
            </View>
          </Card>
        </View>

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
  },
  appBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
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
    backgroundColor: colors['surface-container-highest'],
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
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['headline-md'],
    color: colors.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  securedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['secondary-container'],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    gap: 6,
  },
  badgeIcon: {
    color: colors['on-secondary-container'],
    fontSize: 12,
  },
  badgeText: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['on-secondary-container'],
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
  statusSection: {
    marginBottom: spacing[4],
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing[4],
  },
  partnerStatusLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
  },
  statusTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: 32,
    fontWeight: typography.weights.extrabold,
    color: colors['on-surface'],
  },
  powerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  powerIcon: {
    fontSize: 28,
  },
  shieldCard: {
    marginBottom: spacing[4],
  },
  shieldCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[5],
  },
  shieldIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors['secondary-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldEmoji: {
    fontSize: 24,
  },
  shieldTextContainer: {
    flex: 1,
  },
  shieldTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['title-md'],
    color: colors['on-surface'],
  },
  shieldSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-sm'],
    color: colors['on-surface-variant'],
    fontWeight: typography.weights.medium,
  },
  chevron: {
    fontSize: 24,
    color: colors.primary,
  },
  weatherAlert: {
    marginBottom: spacing[4],
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    backgroundColor: `${colors['error-container']}1A`,
  },
  alertContent: {
    flexDirection: 'row',
    gap: spacing[4],
    padding: spacing[5],
  },
  alertIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['title-md'],
    color: colors['on-surface'],
    letterSpacing: typography.letterSpacing.tight,
    marginBottom: spacing[1],
  },
  alertSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-md'],
    color: colors['on-surface-variant'],
    lineHeight: 20,
  },
  earningsCard: {
    marginBottom: spacing[4],
    padding: spacing[6],
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  earningsTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['title-lg'],
    color: colors['on-surface'],
  },
  weeklyBadge: {
    backgroundColor: colors['surface-container-highest'],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
  },
  weeklyText: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  chart: {
    flexDirection: 'row',
    height: 128,
    alignItems: 'flex-end',
    gap: spacing[2],
    paddingTop: spacing[4],
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: '100%',
    backgroundColor: colors['surface-container-highest'],
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  activeBar: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[1],
    paddingTop: spacing[4],
    marginTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors['outline-variant'],
    opacity: 0.3,
  },
  chartLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
  },
  activeChartLabel: {
    color: colors.primary,
  },
  earningsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing[4],
    marginTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors['outline-variant'],
    opacity: 0.3,
  },
  payoutLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
  },
  payoutAmount: {
    fontFamily: typography.fonts.headline,
    fontSize: 24,
    fontWeight: typography.weights.extrabold,
    color: colors['on-surface'],
  },
  withdrawButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.full,
  },
  withdrawText: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['body-sm'],
    color: colors['on-primary'],
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing[4],
    marginBottom: spacing[4],
  },
  statCard: {
    flex: 1,
    aspectRatio: 1,
    padding: spacing[5],
    justifyContent: 'space-between',
  },
  statIcon: {
    fontSize: 32,
  },
  statContent: {
    marginTop: spacing[2],
  },
  statValue: {
    fontFamily: typography.fonts.headline,
    fontSize: 32,
    fontWeight: typography.weights.extrabold,
    color: colors['on-surface'],
  },
  statLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
    marginTop: spacing[1],
  },
  ratingCard: {
    backgroundColor: colors['secondary-container'],
  },
  starIcon: {
    fontSize: 32,
  },
  ratingValue: {
    color: colors['on-secondary-container'],
  },
  ratingLabel: {
    color: colors['on-secondary-container'],
    opacity: 0.6,
  },
  bottomSpacer: {
    height: 100,
  },
});
