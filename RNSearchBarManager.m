#import "RNSearchBarManager.h"

#import "RNSearchBar.h"

#import "RCTBridge.h"

@implementation RNSearchBarManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RNSearchBar *searchBar = [[RNSearchBar alloc] initWithEventDispatcher:self.bridge.eventDispatcher];

  return searchBar;
}

RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
RCT_EXPORT_VIEW_PROPERTY(showsCancelButton, BOOL)

- (NSDictionary *)constantsToExport
{
  return @{
           @"ComponentHeight": @([self view].intrinsicContentSize.height),
           };
}

@end
